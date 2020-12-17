import User from '../models/User'
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';

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

  async create (req,res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email('Email inválido').required(),
      senha: Yup.string().min(6).required(),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({msg : "Corpo da requisição inválido"});
    }
    try{
      const { nome, email, senha } = req.body;
      const password = await bcrypt.hash(senha, 8);

      const usuarioRegistrado = await User.findOne({where :{ email }});
      if(alunoRegistrado){
        return res.status(400).json({msg:"Usuário já registrado"})
      }

      const
    }catch(err){
      return res.status(400).json({msg:"Err"});
    }
  }
}

export default new UserController();
