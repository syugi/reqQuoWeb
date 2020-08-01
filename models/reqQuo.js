const Sequelize = require('sequelize');

module.exports = class ReqQuo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      custNm: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      telNo: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      reqDate: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      emailId: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      emailDown: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      upjong: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      boilerType: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      postCode: {
        type: Sequelize.STRING(6),
        allowNull: true,
      },
      addr: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      dtlAddr: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      extAddr: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      descr: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      custType: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'ReqQuo',
      tableName: 'reqQuos',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.ReqQuo.hasMany(db.SendMsg);
    db.ReqQuo.hasMany(db.AtchFile);
  }
};
