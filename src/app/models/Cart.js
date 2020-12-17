import Sequelize, { Model } from 'sequelize';

class Products extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }
}

export default Products;
