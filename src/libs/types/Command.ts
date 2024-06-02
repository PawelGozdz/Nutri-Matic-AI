import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";

export type IBuilders =
  | SlashCommandBuilder
  | SlashCommandSubcommandBuilder
  | SlashCommandSubcommandGroupBuilder;

export abstract class Command<T = IBuilders> {
  constructor(builder: T) {
    Object.assign(this, builder) as T;
  }

  abstract execute(_interaction: ChatInputCommandInteraction): Promise<void>;
}
