import { Client, Collection, REST, Routes } from 'discord.js';
import { Command } from '../types';
import { isConstructorFunction, loadFiles } from '../utils';

interface CommandServiceOptions {
  commandsDir: string;
  registerSlashCommands?: boolean;
  commandFilePattern?: string | string[];
  cleanup?: boolean;
}

export class CommandService {
  commands: Collection<string, Command> = new Collection();
  rest = new REST({ version: '10' });

  constructor(
    private client: Client,
    private options: CommandServiceOptions,
  ) {
    this.options = {
      cleanup: false,
      registerSlashCommands: true,
      commandFilePattern: '{.js,.ts}',
      ...options,
    };

    this.rest = this.rest.setToken(process.env.DISCORD_OAUTH_TOKEN as string);
  }

  async init() {
    const files = await loadFiles(`**/*${this.options.commandFilePattern}`, { dir: this.options.commandsDir });

    for (const file of files) {
      for (const CommandClass of Object.values(file)) {
        if (!isConstructorFunction(CommandClass)) continue;

        const instance = new CommandClass();

        if (instance instanceof Command) {
          this.commands.set(instance.name, instance);
        }
      }
    }

    if (this.options.registerSlashCommands) await this.registerCommands();
    if (this.options.cleanup) await this.cleanupCommands();
  }

  private async cleanupCommands() {
    console.log(`Starting Cleanup...`);
    const registeredCommands = await this.rest.get(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, process.env.GUILD_ID as string)) as unknown[];

    const leaveOnlyUsedCommands = registeredCommands.filter((command: any) => this.commands.has(command?.name));

    await this.rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, process.env.GUILD_ID as string), { body: leaveOnlyUsedCommands });

    console.log(`Cleanup completed! Removed ${registeredCommands.length - leaveOnlyUsedCommands.length} commands.`);
  }

  private async registerCommands() {
    console.log('Started refreshing application (/) commands.');

    const commands = this.commands.map((command) => ({ name: command.name, description: command.description }));

    if (commands.length > 0) {
      await this.rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, process.env.GUILD_ID as string), { body: commands });
    }

    console.log('Successfully reloaded application (/) commands.');

    await this.executeCommands();
  }

  private async executeCommands() {
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand() || !interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing command ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        throw error;
      }
    });
  }
}