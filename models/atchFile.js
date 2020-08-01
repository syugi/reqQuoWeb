const Sequelize = require('sequelize');

module.exports = class AtchFile extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      orgFileNm: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      strFileNm: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      filePath: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      fileSize: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      fileType: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      fileDescr: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'AtchFile',
      tableName: 'atchFiles',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.AtchFile.belongsTo(db.ReqQuo);
  }
};
