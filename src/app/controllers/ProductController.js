import Products from '../models/Products';

class ProductController {
  async index(req,res){


    try{
      const products = await Products.findAll();
      return res.status(200).json(products);
    }catch(err){
      return res.status(400).json({msg: "Error"})
    }
  }
  async show(req,res){

    const { id } = req.params;
    try{
      const product = await Products.findByPk(id)
      if(!product){
        return res.status(400).json({msg:"Product not find"});
      }
      return res.status(200).json(product);
    }catch(err){
      return res.status(400).json({msg: "Error"})
    }
  }
}

export default new ProductController();
