import Sequelize, { Model } from 'sequelize';

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        preco_unitario: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
  }
}

export default Products;
