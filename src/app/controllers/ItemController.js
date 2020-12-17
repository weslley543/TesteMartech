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
      const { quantidade } = req.body;
      const items = await Items.create({ id_produto, id_carrinho, quantidade });
      return res.status(200).json(items);
    }catch(err){
      console.log(err);
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
      const item = await Items.findByPk(id);
      if(!item){
        return res.status(400).json({ msg: "Item não encontrado" });
      }
      const { quantidade } = req.body;
      if(quantidade === 0){
        await item.destroy();
        return res.status(200).json( {msg: "Excluido"} );
      }
      item.quantidade = quantidade;
      await item.save();
      return res.status(200).json({msg:"Updated"});

    }catch(err){
      console.log(err)
      return res.status(400).json({ msg: "Err" })
    }
  }

  async delete (req,res){
    const { id } = req.params;
    try{
      await Item.destroy({where:{ id }});
      return res.status(200).json({msg:"Deleted"});
    }catch(err){
      return res.status(400).json({ msg:"Err" })
    }
  }
}

export default new ItemController();
