module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('item', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_carrinho:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('item');
  },
};
