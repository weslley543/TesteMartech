import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Cart from '../app/models/Cart';
import Items from '../app/models/Items';
import Products from '../app/models/Products';

const models = [User, Cart,Items, Products];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => {
      model.init(this.connection);
    });
  }
}

export default new Database();
