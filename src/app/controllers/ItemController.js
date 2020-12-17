import Items from '../models/Items';
import * as Yup from 'yup';

class ItemController {
  async create(req,res){
    const { id_produto, id_carrinho } = req.params;
    const schema = Yup.object().shape({
      quantidade: Yup.number().required(),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ msg:"Por favor insira aqui a quantidade de items" });
    }
    try{
      const items = await Items.create({ id_produto, id_carrinho, quantidade });
      return res.status(200).json(items);
    }catch(err){
      return res.status(400).json({ msg:"Erro" });
    }

  }
  async update(req,res){
    const schema = Yup.object().shape({
      quantidade: Yup.number().required(),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ msg:"Por favor insira aqui a quantidade de items" });
    }
    const { id } = req.params;
    try{
      const item = await Item.findByPk(id);
      if(!item){
        return res.status(400).json({ msg: "Item não encontrado" });
      }
      if(quantidade === 0){
        await item.destroy();
        return res.status(200).json( {msg: "Excluido"} );
      }
      item.quantidade = quantidade;
      await item.save();
      return res.status(200).json({msg:"Updated"})
    }catch(err){
      return res.status(400).json({ msg: "Err" })
    }
  }
}

export default new ItemController();
