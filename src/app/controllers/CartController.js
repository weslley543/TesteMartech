import Carrinho from '../models/Carrinho';
import User from '../models/User';
import Item from '../models/Items';
import Produto from '../models/Produto';

class CartController {
  async create(req, res) {
    try {
      const cart = await Carrinho.create();
      return res.status(200).json(cart);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: 'Error' });
    }
  }
  async update(req, res) {
    const { id, id_usuario } = req.params;
    try {
      const cart = await Carrinho.findByPk(id);
      if (!cart) {
        return res.status(400).json({ msg: 'Carrinho não encontrado' });
      }
      const user = await User.findByPk(id_usuario);
      if (!user) {
        return res.status(400).json({ msg: 'Usuário não encontrado' });
      }
      const updatedCart = cart.update({ id_usuario });
      return res.status(200).json(updatedCart);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: 'Error' });
    }
  }

  async index(req, res) {
    const { id } = req.params;
    try {
      const items = await Item.findAll({
        where: { id_carrinho: id },
        include: [{ model: Produto, as:'produto' }],
      });

      return res.status(200).json(items);
    } catch (e) {
      console.log(e)
      return res.status(400).json({ msg: 'Err' });
    }
  }
}

export default new CartController();
