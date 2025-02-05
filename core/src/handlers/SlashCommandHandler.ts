import {CacheType, Client, ClientEvents, Interaction, REST, Routes} from "discord.js";
import SlashCommand from "../models/SlashCommand";
import Event from "../models/Event";
import {registerEvents} from "./EventsHandler";

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);
const slashRegistry = new Map<string, SlashCommand>();

class SlashCommandListener extends Event {
    readonly eventType: keyof ClientEvents = "interactionCreate"
    readonly name: string = "slashCommandListener"

    async execute(interaction: Interaction<CacheType>): Promise<void> {
        if (interaction.isChatInputCommand()) slashRegistry.get(interaction.commandName)?.execute(interaction);
    }
}

export async function registerSlashCommands(client: Client, ...slashCommands: SlashCommand[]) {

    await registerEvents(client, new SlashCommandListener());

    for (const slashCommand of slashCommands) {
        try {

            slashRegistry.set(slashCommand.data.name, slashCommand);

            if (slashCommand.registrationType === "guild") {
                await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), {body: [slashCommand.data.toJSON()]});
            }

            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {body: [slashCommand.data.toJSON()]});

            console.log(`Slash command ${slashCommand.data.name} registered.`);
        } catch (error) {
            console.error(error);
        }
    }
}