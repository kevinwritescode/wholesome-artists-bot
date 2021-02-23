
const CHANNELS = require('../config/channels');
const Discord = require('../lib/discord');

module.exports = async (req, res) => {
  return Discord.run(res, async (client) => {
    const promoteChannel = client.channels.cache.get(CHANNELS.PROMOTED_ART);
    const modsChannel = client.channels.cache.get(CHANNELS.MJOLNIR);
    const messages = await promoteChannel.messages.fetch({ limit: 10 });
  
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
    return output;
  });
}