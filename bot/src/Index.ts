import {Client, GatewayIntentBits} from "discord.js";
import {registerEvents} from "../../core/src/handlers/EventsHandler";
import 'dotenv/config';
import {Ready} from "./events/TestListener";
import {registerSlashCommands} from "../../core/src/handlers/SlashCommandHandler";
import {TestCommand, TestCommandButtonListener} from "./slashCommands/TestCommand";

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a: string) => {
        return GatewayIntentBits[a as keyof typeof GatewayIntentBits];
    })
});

registerEvents(client, new Ready(), new TestCommandButtonListener());
registerSlashCommands(client, new TestCommand());

client.login(process.env.DISCORD_TOKEN).then()
