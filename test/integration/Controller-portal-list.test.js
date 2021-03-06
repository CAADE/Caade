const request = require("supertest-as-promised");
const taction = require('../../api/controllers/portal/list');

describe('Controller portal  Test Cases', function () {
  describe('Primary Controller portal list Test Case', function () {
    // Requires an environment and stack be created first.
    it('Primary Controller portal list Good Path', function (done) {
      let url = "/portal/list?";
      let params = [];
      _.each(Object.keys(taction.inputs), function (key) {
        if (key !== "mode") {
          params.push(key + "=" + taction.inputs[key].type);
        }
        else {
          params.push("mode=json");
        }
      });
      url += params.join("&");
      request(sails.hooks.http.app)
        .get(url)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          else {
            console.log(res.body);
            return done();
          }
        });
    });
  });
});
