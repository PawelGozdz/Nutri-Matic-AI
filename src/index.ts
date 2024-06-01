import 'dotenv/config';
import path from 'path';
import { client } from './client';
import { CommandService, EventService } from './libs';

const commandsService = new CommandService(client, {
  commandsDir: path.join(__dirname, 'commands'),
})

const eventsService = new EventService(client, {
  eventsDir: path.join(__dirname, 'events'),
})

main();

async function main() {
  await commandsService.init();
  await eventsService.init();

  console.log('COMM', commandsService.commands)
  console.log('EVENTS', eventsService.events)

  client.login(process.env.DISCORD_OAUTH_TOKEN);
}