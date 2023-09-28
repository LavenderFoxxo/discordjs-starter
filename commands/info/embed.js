const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("A simple embed command to demonstrate input fields and embed building!")
        .addStringOption(option => // there are also a lot of other options such as a member option, or even a number option (interger), refer to the DiscordJS Documentation.
            option
                .setName("title")
                .setDescription("What would you like to set the title of the embed as?")
                .setRequired(true)    
        ),
    run: async (client, interaction) => {
        await interaction.deferReply();

        // Let's break down an embed.
        const title = interaction.options.getString("title"); // SET THIS TO THE NAME OF THE STRING OPTION
        const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription("Wow! This is pretty neat, this actually worked! Hello Discord.JS!!!")
        .setColor("Purple")

        return interaction.editReply({
            embeds: [
                embed
            ]
        })
    }
}
