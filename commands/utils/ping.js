const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong~"),
    run: async (client, interaction) => {
        const message = await interaction.deferReply({ fetchReply: true });
        await interaction.editReply(
            `Ping! Took \`${Math.round(
                message.createdTimestamp - interaction.createdTimestamp
            )}ms\` (API \`${Math.round(client.ws.ping)}ms\`)`
        );
    }
}
