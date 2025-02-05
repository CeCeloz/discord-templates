import Event from "../models/Event";
import {Client, ClientEvents} from "discord.js";

const eventRegistry = new Map<keyof ClientEvents, Event[]>();

export async function registerEvents(client: Client, ...events: Event[]) {
    for (const event of events) {
        client.removeAllListeners(event.eventType);

        if (!eventRegistry.has(event.eventType)) eventRegistry.set(event.eventType, []);

        const eventList = eventRegistry.get(event.eventType)!;

        eventList.push(event);
        eventList.sort((a, b) => b.priority - a.priority);

        try {
            for (const eventHandler of eventList) {
                if (eventHandler.once) {
                    client.once(eventHandler.eventType, (...args: ClientEvents[keyof ClientEvents]) => {
                        eventHandler.execute(...args);
                        eventRegistry.delete(eventHandler.eventType)
                    });
                } else {
                    client.on(eventHandler.eventType, (...args: ClientEvents[typeof eventHandler.eventType]) => {
                        eventHandler.execute(...args);
                    });
                }
            }
        } catch (error) {
            console.error(`Error executing event ${event.name} (${event.eventType}):`, error);
        }

        console.log(`Event ${event.name} registered on ${event.eventType}.`);
    }
}