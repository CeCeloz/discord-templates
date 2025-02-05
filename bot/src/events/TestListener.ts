import Event from "../../../core/src/models/Event";
import {Client, ClientEvents} from "discord.js";

export class Ready extends Event {
    readonly eventType: keyof ClientEvents = "ready"
    readonly name: string = "ready"

    async execute(client: Client<true>): Promise<void> {
        console.log(`Logged in as ${client.user?.tag}!`);
    }
}
