import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CartController from './app/controllers/CartController';
import ProductController from './app/controllers/ProductController'
import CartController from './app/controllers/CartController';
import ItemController from './app/controllers/ItemController'
import authmiddleware from './middlewares/authmiddleware';

const routes = new Router();

routes.post('/session', SessionController.index);
routes.post('/user', UserController.create);
routes.get('/produto', ProductController.index);
routes.get('/produto/:id', ProductController.show);
routes.post('/cart', CartController.create);

routes.post('/item', ItemController.create);
routes.put('/item/:id', ItemController.update);
routes.delete('/item/:id', ItemController.delete);

routes.use(authmiddleware);

routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.post('/carrinho/user/:id', CartController.create);
routes.put('/cart/:id/usuario/:id_usuario', CartController.update);

export default routes;
