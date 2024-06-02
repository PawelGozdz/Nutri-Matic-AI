import { Client, Events } from "discord.js";
import { Event, Logger } from "../../libs";

export class ReadyEvent extends Event<Events.ClientReady> {
  name = Events.ClientReady;
  once = true;
  description = "Ready event";

  async execute(client: Client<true>) {
    Logger.info(`Logged in as ${client.user?.username}!`);
  }
}
