import 'dotenv/config';
import { client } from './client';

client.on('ready', (c) => {
  console.log(`***${c.user.username} is ONLINE***`);
});

client.login(process.env.DISCORD_OAUTH_TOKEN);