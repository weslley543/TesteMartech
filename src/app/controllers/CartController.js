import Cart from '../models/Cart';

class CartController {
  async create(req,res){
    const { id } = req.params;

    try{
      const cart = await Cart.create({ id_usuario:id });
      return res.status(200).json(cart);
    }catch(err){
      return res.status(400).json({msg: "Error"})
    }
  }
}

export default new CartController();
