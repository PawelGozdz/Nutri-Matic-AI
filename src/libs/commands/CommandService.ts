import { Client, Collection, Events, REST, Routes } from "discord.js";
import { Logger } from "../logger";
import { Command, IBuilders } from "../types";
import { isConstructorFunction, loadFiles } from "../utils";

interface CommandServiceOptions {
  commandsDir: string;
  registerSlashCommands?: boolean;
  commandFilePattern?: string | string[];
  cleanup?: boolean;
}

export class CommandService {
  commands: Collection<string, Command & IBuilders> = new Collection();
  rest = new REST({ version: "10" });

  constructor(
    private client: Client,
    private options: CommandServiceOptions
  ) {
    this.options = {
      cleanup: false,
      registerSlashCommands: true,
      commandFilePattern: "{.js,.ts}",
      ...options,
    };

    this.rest = this.rest.setToken(process.env.DISCORD_OAUTH_TOKEN as string);
  }

  async init() {
    const files = await loadFiles(`**/*${this.options.commandFilePattern}`, {
      dir: this.options.commandsDir,
    });

    for (const file of files) {
      for (const CommandClass of Object.values(file)) {
        if (!isConstructorFunction(CommandClass)) continue;

        const instance = new CommandClass() as IBuilders;

        if (instance instanceof Command) {
          this.commands.set(instance.name, instance);
        }
      }
    }

    if (this.options.registerSlashCommands) await this.registerCommands();
    if (this.options.cleanup) await this.cleanupCommands();
  }

  private async cleanupCommands() {
    Logger.info(`Starting Cleanup...\n`);
    const registeredCommands = (await this.rest.get(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID as string,
        process.env.DISCORD_GUILD_ID as string
      )
    )) as unknown[];

    const leaveOnlyUsedCommands = registeredCommands.filter((command: any) =>
      this.commands.has(command?.name)
    );

    await this.rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID as string,
        process.env.DISCORD_GUILD_ID as string
      ),
      { body: leaveOnlyUsedCommands }
    );

    Logger.success(
      `Cleanup completed! Removed ${registeredCommands.length - leaveOnlyUsedCommands.length} commands.\n`
    );
  }

  private async registerCommands() {
    Logger.info("Started refreshing application (/) commands.\n");

    const commands = this.commands.map((command) => command);

    if (commands.length > 0) {
      await this.rest.put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_CLIENT_ID as string,
          process.env.DISCORD_GUILD_ID as string
        ),
        { body: commands }
      );
    }

    Logger.success("Successfully reloaded application (/) commands.\n");

    await this.executeCommands();
  }

  private async executeCommands() {
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isCommand() || !interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        Logger.error(
          `Error executing command ${interaction.commandName}:`,
          error
        );
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    });
  }
}
