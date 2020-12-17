import Sequelize, { Model } from 'sequelize';

class Items extends Model {
  static init(sequelize) {
    super.init(
      {
        quantidade:Sequelize.INTEGER,
        id_produto:Sequelize.INTEGER,
        id_carrinho:Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Produto, {
      foreignKey: 'id_produto',
      targetKey: 'id',
      as: 'produto',
    });
  }
}

export default Items;
