import "dotenv/config";
import path from "path";
import { client } from "./client";
import { CommandService, EventService, Logger } from "./libs";
import { errorHandling } from "./utils/ErrorHandler";

const commandsService = new CommandService(client, {
  commandsDir: path.join(__dirname, "commands"),
});

const eventsService = new EventService(client, {
  eventsDir: path.join(__dirname, "events"),
});

errorHandling();
main();

async function main() {
  await commandsService.init();
  await eventsService.init();

  Logger.info("COMM", commandsService.commands);
  Logger.info("EVENsTS", eventsService.events);

  client.login(process.env.DISCORD_OAUTH_TOKEN);
}
