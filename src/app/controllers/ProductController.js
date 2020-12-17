import Produto from '../models/Produto';

class ProductController {
  async index(req,res){


    try{
      const products = await Produto.findAll();
      return res.status(200).json(products);
    }catch(err){
      console.log(err);
      return res.status(400).json({msg: "Error"})
    }
  }
  async show(req,res){

    const { id } = req.params;
    try{
      const product = await Produto.findByPk(id)
      if(!product){
        return res.status(400).json({msg:"Product not find"});
      }
      return res.status(200).json(product);
    }catch(err){
      console.log(err)
      return res.status(400).json({msg: "Error"})
    }
  }
}

export default new ProductController();
