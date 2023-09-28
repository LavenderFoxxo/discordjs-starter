const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {import("discord.js").Interaction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      return Object.values(client.commands)
        .flat()
        .find((cmd) => cmd.data.name === interaction.commandName)
        .run(client, interaction);
    }
  },
};
