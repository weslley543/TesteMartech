import User from '../models/User'

class UserController{

  async show (req,res){
    try{
      const { id } = req.params;
      const user = await User.findByPk(id);
      if(!user){
        return res.status(400).json({message: "Usuário não encontrado"};)
      }
      const {nome, email} = user;
      return res.status({nome, email});
    }catch(error){
      return res.status(400).json({err:error.response})
    }
  }
}
