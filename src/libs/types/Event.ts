import { ClientEvents } from "discord.js";

export abstract class Event<Key extends keyof ClientEvents> {
  abstract name: string;
  once?: boolean;
  abstract description?: string;
  abstract execute(...args: ClientEvents[Key]): void;
}
