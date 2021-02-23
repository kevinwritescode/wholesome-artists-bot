require('dotenv').config();
const assert = require('assert');
const apiHighlight = require('../api/highlight');

describe('/api/highlight', () => {
  it('success', (done) => {
    apiHighlight({ }, { json: (res) => {
      assert(res);
      done();
    } });
  });
});