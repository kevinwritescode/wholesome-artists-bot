require('dotenv').config();
const assert = require('assert');
const apiUpdate = require('../api/update');

describe('Update', () => {
  it('success', (done) => {
    apiUpdate({ }, { json: (res) => {
      assert(res);
      done();
    } });
  });
});