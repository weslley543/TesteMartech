import Carrinho from '../models/Carrinho';
import User from '../models/User';

class CartController {
  async create(req,res){

    try{
      const cart = await Carrinho.create();
      return res.status(200).json(cart);
    }catch(err){
      console.log(err);
      return res.status(400).json({msg: "Error"})
    }
  }
  async update(req,res){
    const { id, id_usuario } = req.params;
    try{
      const cart = await Carrinho.findByPk(id);
      if(!cart){
        return res.status(400).json({msg:"Carrinho não encontrado"});
      }
      const user = await User.findByPk(id_usuario);
      if(!user){
        return res.status(400).json({ msg:"Usuário não encontrado" })
      }
      const updatedCart = cart.update({id_usuario});
      return res.status(200).json(updatedCart);
    }catch(err){
      console.log(err);
      return res.status(400).json({msg: "Error"})
    }
  }
}

export default new CartController();
