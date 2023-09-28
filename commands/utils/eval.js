const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { inspect } = require("util");
const { default: trim } = require("../../util/trim");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evaluate")
    .setDescription("Run JavaScript Code")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The code you would like to run")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    await interaction.deferReply();

    const code = interaction.options.getString("code", true);
    let res;
    try {
      res = await eval(code);
      res = inspect(res, { depth: 0 });
    } catch (error) {
      res = inspect(error, { depth: 0 });
    }
    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle("Eval Results")
      .setDescription(`\`\`\`js\n${trim(res, 4000)}\`\`\``)
      .setTimestamp()
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    await interaction.editReply({ embeds: [embed] });
  },
};
