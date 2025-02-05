import SlashCommand from "../../../core/src/models/SlashCommand";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CacheType,
    CommandInteraction,
    Interaction,
    SlashCommandBuilder
} from "discord.js";
import Event from "../../../core/src/models/Event";

export class TestCommand extends SlashCommand {
    readonly data: SlashCommandBuilder = new SlashCommandBuilder()
        .setName('test')
        .setDescription('test')

    async execute(interaction: CommandInteraction): Promise<void> {
        const button = new ButtonBuilder().setCustomId('test').setLabel('Test').setStyle(ButtonStyle.Primary);
        const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

        await interaction.reply({
            content: 'Test command executed!', components: [buttonRow], flags: "Ephemeral"
        });
    }
}

export class TestCommandButtonListener extends Event {
    readonly name = 'test';
    readonly eventType = 'interactionCreate';

    async execute(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'test') {
            await interaction.reply('Button clicked!');
        }
    }
}
