import Sequelize, { Model } from 'sequelize';

class Products extends Model {
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
}

export default Products;
