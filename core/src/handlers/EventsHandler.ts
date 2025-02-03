import Event from "../models/Event";
import {Client, ClientEvents} from "discord.js";

const eventRegistry = new Map<keyof ClientEvents, Event[]>();

export function registerEvent(client: Client, event: Event) {
    client.removeAllListeners(event.eventType);
    
    if (!eventRegistry.has(event.eventType)) eventRegistry.set(event.eventType, []);

    const events = eventRegistry.get(event.eventType)!;

    events.push(event);
    events.sort((a, b) => b.priority - a.priority);

    try {
        for (const eventHandler of events) {
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