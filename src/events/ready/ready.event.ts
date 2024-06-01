import { Client } from 'discord.js';
import { Event } from '../../libs';

export class ReadyEvent extends Event<'ready'> {
  name = 'ready';
  once = true;
  description = 'Ready event';

  async execute(client: Client<true>) {
    console.log(`Logged in as ${client.user?.tag}!`)
  }
};

