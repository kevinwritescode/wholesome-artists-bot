require('dotenv').config();
const apiUpdate = require('../api/update');

describe('Update', () => {
  it('success', () => {
    apiUpdate({ }, { json: console.log });
  });
});