import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Carrinho from '../app/models/Carrinho';
import Items from '../app/models/Items';
import Produto from '../app/models/Produto';

const models = [User, Carrinho,Items, Produto];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => {
      model.init(this.connection);
    });
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
