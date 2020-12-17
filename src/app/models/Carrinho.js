import Sequelize, { Model } from 'sequelize';

class Carrinho extends Model {
  static init(sequelize) {
    super.init(
      {id_usuario: Sequelize.INTEGER},
      {
        sequelize,
      }
    );
  }
}

export default Carrinho;
