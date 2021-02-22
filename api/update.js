const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (req, res) => {
  client.once('ready', async () => {
    const channel = await client.channels.cache.get('744976954913980577');
    const messages = await channel.messages.fetch({ limit: 100 });
  
    const output = 'Kevin is testing, there are ' + messages.length + ' new messages';
    await channel.send(output);

    res.json({
      message: output,
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    });
  });
  
  client.login(process.env.DISCORD_TOKEN);
}