import { Client } from "discord.js";
import { Event, Logger } from "../../libs";

export class ReadyEvent extends Event<"ready"> {
  name = "ready";
  once = true;
  description = "Ready event";

  async execute(client: Client<true>) {
    Logger.info(`Logged in as ${client.user?.tag}!`);
  }
}
