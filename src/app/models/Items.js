import Sequelize, { Model } from 'sequelize';

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity:Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );
  }
}

export default Products;
