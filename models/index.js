const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const ReqQuo = require('./reqQuo');
const AtchFile = require('./atchFile');
const SendMsg = require('./sendMsg');
const AdminUser = require('./adminUser');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.ReqQuo    = ReqQuo;
db.AtchFile  = AtchFile;
db.SendMsg   = SendMsg;
db.AdminUser = AdminUser;

ReqQuo.init(sequelize);
AtchFile.init(sequelize);
SendMsg.init(sequelize);
AdminUser.init(sequelize);

ReqQuo.associate(db);
AtchFile.associate(db);
SendMsg.associate(db);
AdminUser.associate(db);

module.exports = db;