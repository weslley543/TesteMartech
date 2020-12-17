import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CartController from './app/controllers/CartController';
import ProductController from './app/controllers/ProductController'
import CartController from './app/controllers/CartController';
import authmiddleware from './middlewares/authmiddleware';

const routes = new Router();

routes.post('/session', SessionController.index);
routes.post('/user', UserController.create);

routes.use(authmiddleware);

routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);

routes.post('/carrinho/user/:id', CartController.create);

routes.get('/produto', ProductController.index);
routes.get('/produto/:id', ProductController.show);
routes.post('/cart', CartController.create);
routes.put('/cart/:id/usuario/:id_usuario', CartController.update);

export default routes;
