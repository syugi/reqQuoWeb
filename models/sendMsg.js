const Sequelize = require('sequelize');

module.exports = class SendMsg extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      reqDate: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      toTelNo: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      fromTelNo: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      contents: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      msgType: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      sendYn: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      errMsg: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'SendMsg',
      tableName: 'sendMsgs',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
      db.SendMsg.belongsTo(db.ReqQuo);
  }
};
