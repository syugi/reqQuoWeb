const Sequelize = require('sequelize');

module.exports = class AdminUser extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      userName: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'AdminUser',
      tableName: 'adminUsers',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
  }
};
