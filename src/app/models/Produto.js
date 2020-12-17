import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        preco_unitario: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
  }
}

export default Produto;
