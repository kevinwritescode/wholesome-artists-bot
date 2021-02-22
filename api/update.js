const Discord = require('discord.js');

const CHANNEL_MODS = '769028512660979743';
const CHANNEL_PROMOTE = '740423263683084341';

module.exports = async (req, res) => {
  const client = new Discord.Client();

  try {
    client.once('ready', async () => {
      const promoteChannel = await client.channels.cache.get(CHANNEL_PROMOTE);
      const modsChannel = await client.channels.cache.get(CHANNEL_MODS);
      const messages = await promoteChannel.messages.fetch({ limit: 100 });
    
      const latest = messages.values().next().value;

      let output;
      if (latest?.embeds?.[0]) {
        const embed = latest.embeds[0];
        // A hack to get the authorId from their icon since this embeded post doesn't natively share it
        const authorId = embed.author.iconURL.split('/')[4];
        output = `<@${authorId}> posted ${embed.image.url}`;
      } else {
        output = `<@${latest.author.id}> said "${latest.content}"`;
      }

      await modsChannel.send(output);

      const response = {
        message: output,
        body: req.body,
        query: req.query,
        cookies: req.cookies,
      };

      res.json(response);
      client.destroy();
    });
    
    client.login(process.env.DISCORD_TOKEN);
  } catch (err) {
    res.json({ err });
    client.destroy();
  }
}