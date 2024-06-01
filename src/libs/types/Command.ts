import { ChatInputCommandInteraction } from 'discord.js';

export abstract class Command {
  abstract name: string;
  abstract description: string;
  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
