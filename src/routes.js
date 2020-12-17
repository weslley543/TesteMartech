import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CartController from './app/controllers/CartController';
import authmiddleware from './middlewares/authmiddleware';

const routes = new Router();

routes.post('/session', SessionController.index);
routes.post('/user', UserController.create);

routes.use(authmiddleware);

routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);

routes.post('/carrinho/user/:id', CartController.create);



export default routes;
