const { Events } = require("discord.js");
const log = require("../util/logger");
module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   *  @param {import("discord.js").Client} client
   */
  async execute(client) {
    log(`Logged in as ${client.user.tag}!`, 'info')
  },
};
