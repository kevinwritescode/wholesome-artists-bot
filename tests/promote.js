require('dotenv').config();
const assert = require('assert');
const apiUpdate = require('../api/promote');

describe('/api/promote', () => {
  it('success', (done) => {
    apiUpdate({ }, { json: (res) => {
      assert(res);
      done();
    } });
  });
});