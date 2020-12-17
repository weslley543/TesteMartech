import Sequelize, { Model } from 'sequelize';

class Items extends Model {
  static init(sequelize) {
    super.init(
      {
        quantidade:Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Produto, {
      foreignKey: 'id_produto',
      as: 'produto',
    });
  }
}

export default Items;
