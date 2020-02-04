const config = require('../../config');

module.exports.index = function (req, res, next) {
  if (!req.accepts('html')) {
    return res.status(404);
  }

  async function handle() {
    return res.render('index', {
      user: req.user ? await req.user.toJSON() : null,
      context: {
        sentry: {
          public: config.app.sentry.public
        }
      }
    });
  }

  handle().catch(next);
};
