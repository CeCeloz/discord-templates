import Event from "../../../core/src/models/Event";
import {ClientEvents, Message, OmitPartialGroupDMChannel} from "discord.js";

export class Test extends Event {
    readonly name: string = "Ada"
    readonly eventType: keyof ClientEvents = "messageCreate"

    execute(message: OmitPartialGroupDMChannel<Message>): void | Promise<void> {
        console.log("oi")
    }

}

export class Test2 extends Event {
    readonly name: string = "Ada2"
    readonly eventType: keyof ClientEvents = "messageCreate"
    execute(message: OmitPartialGroupDMChannel<Message>): void | Promise<void> {
        console.log("oi2")
    }

}

