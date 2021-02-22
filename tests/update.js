const apiUpdate = require('../api/update');
process.env.DISCORD_TOKEN = 'NzU1OTQ4ODg2MDEwMzYzOTQ2.X2KuQw.ZWehDHkppcMsSb_GF5I-aF4hRp8';

describe('Update', () => {
  it('success', () => {
    apiUpdate({ }, { json: console.log });
  });
});