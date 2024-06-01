import { Client, ClientEvents } from 'discord.js';

export abstract class Event<Key extends keyof ClientEvents> {
  abstract name: string;
  abstract once: boolean;
  abstract description?: string;
  abstract execute(client: Client, ...args: ClientEvents[Key]): void;
}