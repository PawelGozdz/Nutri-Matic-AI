import { Client, ClientEvents, Collection } from "discord.js";
import { Logger } from "../logger";
import { Event } from "../types";
import { isConstructorFunction, loadFiles } from "../utils";

interface EventServiceOptions {
  registerEvents?: boolean;
  eventFilePattern?: string;
  eventsDir: string;
}

export class EventService {
  events: Collection<string, Event<any>> = new Collection();

  constructor(
    private client: Client,
    private options: EventServiceOptions
  ) {
    this.options = {
      registerEvents: true,
      eventFilePattern: "{.js,.ts}",
      ...options,
    };
  }

  async init() {
    const files = await loadFiles(`**/*${this.options.eventFilePattern}`, {
      dir: this.options.eventsDir,
    });
    for (const file of files) {
      for (const EventClass of Object.values(file)) {
        if (!isConstructorFunction(EventClass)) continue;

        const instance = new EventClass();

        if (instance instanceof Event) {
          this.events.set(instance.name, instance);
        }
      }
    }

    if (this.options.registerEvents) {
      await this.registerEvents();
    }
  }

  private async registerEvents() {
    for await (const event of this.events.values()) {
      this.client.on(event.name, (...args: ClientEvents[]) => {
        const handler = this.events.get(event.name);
        if (!handler) {
          Logger.info(`Event handler for @${event.name}@ not found`);
        } else {
          handler.execute(...args);
        }
      });
    }
  }
}
