const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (req, res) => {
  client.once('ready', async () => {
    const channel = await client.channels.cache.fetch('744976954913980577');
    const messages = channel.messages.fetch({ limit: 100 });
  
    channel.send('Kevin is testing, there are ' + messages.length + ' new messages');

    res.json({
      message: 'message sent to server',
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    });
  });
  
  client.login(process.env.DISCORD_TOKEN);
}