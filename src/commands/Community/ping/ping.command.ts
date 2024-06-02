import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../../libs";

const builder = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export class PingCommand extends Command {
  constructor() {
    super(builder);
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    interaction.editReply(
      `Pong! Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`
    );
  }
}
