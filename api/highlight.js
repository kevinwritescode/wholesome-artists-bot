
const ROLES = require('../config/roles');
const CHANNELS = require('../config/channels');
const Discord = require('../lib/discord');

module.exports = async (req, res) => Discord.run(res, async (client, guild) => {
  const helperRole = guild.roles.cache.get(ROLES.HELPER);
  const patreonRole = guild.roles.cache.get(ROLES.PATREON);

  const leaders = [...helperRole.members.values(), ...patreonRole.members.values()];
  const message = leaders.reduce((m, r) => m + r.nickname + ', ', '');
  
  const modsChannel = client.channels.cache.get(CHANNELS.MJOLNIR);
  await modsChannel.send(message);

  return message;
});