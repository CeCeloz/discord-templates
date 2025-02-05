import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export default abstract class SlashCommand {
    abstract readonly data: SlashCommandBuilder;

    readonly registrationType: string;

    constructor() {
        this.registrationType = "global";
    }

    public abstract execute(interaction: CommandInteraction): void | Promise<void>;
}