const Discord = require('discord.js');
const GUILD = require('../config/guild');

module.exports = {
  /**
   * Callback run function to help shortcut Discord and Reddit usage
   *
   * @async
   * @callback runCallback
   * @param {object} client Discord client
   * @param {object} guild Discord guild
   * @return {object} Response to share with output route
   */

  /**
   * 
   * @param {object} res 
   * @param {runCallback} callback 
   * @param {string} token Login token
   */
  async run(res, callback, token = process.env.DISCORD_TOKEN) {
    let client = { destroy: () => {} };

    try {
      client = new Discord.Client();

      client.once('ready', async () => {
        const guild = client.guilds.cache.get(GUILD.ID);
        const response = await callback(client, guild);
        res.json(response);
        client.destroy();
      });

      client.login(token);
    } catch (err) {
      res.json({ err });
      client.destroy();
    }
  }
}