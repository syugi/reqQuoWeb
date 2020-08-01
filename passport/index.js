const passport  = require('passport');
const local     = require('./localStrategy');
const AdminUser = require('../models/adminUser');

module.exports = () => {
  passport.serializeUser((AdminUser, done) => {
    done(null, AdminUser.userId);
  });

  passport.deserializeUser((userId, done) => {
    AdminUser.findOne({
      where: { userId },
    })
      .then(adminUser => done(null, adminUser))
      .catch(err => done(err));
  });

  local();
};