const Discord = require('discord.js');

const CHANNEL_MODS = '769028512660979743';
const CHANNEL_PROMOTE = '740423263683084341';

const client = new Discord.Client();

module.exports = (req, res) => {
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

    res.json({
      message: output,
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    });
  });
  
  client.login(process.env.DISCORD_TOKEN);
}