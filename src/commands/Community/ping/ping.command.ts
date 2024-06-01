import { ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../../libs';

export class PingCommand extends Command {
  name = 'ping';
  description = 'Pongasdfasfd!';
  async execute(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Pong! Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`);
  }
};

