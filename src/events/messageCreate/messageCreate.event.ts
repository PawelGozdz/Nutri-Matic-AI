import { Events, Message } from "discord.js";
import { Event, Logger } from "../../libs";

export class MessageCreateEvent extends Event<Events.MessageCreate> {
  name = Events.MessageCreate;
  description = "Message Create";

  async execute(message: Message) {
    if (message.author.bot) return;

    Logger.info("MESSAGE**: ", message.content);
  }
}
