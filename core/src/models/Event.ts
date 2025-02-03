import {ClientEvents} from "discord.js";

export default abstract class Event {
    abstract readonly name: string;
    abstract readonly eventType: keyof ClientEvents

    readonly priority: number;
    readonly once: boolean;

    constructor() {
        this.priority = 1
        this.once = false
    }

    public abstract execute(...args: ClientEvents[keyof ClientEvents]): void | Promise<void>;
}

