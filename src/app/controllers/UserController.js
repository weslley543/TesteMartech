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
        return res.status(400).json({message: "Usuário não encontrado"});
      }
      const {name, email} = user;
      return res.status(200).json({ name, email });
    }catch(error){
      return res.status(400).json({err:error.response})
    }
  }

  async create (req,res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email('Email inválido').required(),
      senha: Yup.string().min(6).required(),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({msg : "Corpo da requisição inválido"});
    }
    try{
      const { name, email, senha } = req.body;


      const usuarioRegistrado = await User.findOne({where :{ email }});
      if(usuarioRegistrado){
        return res.status(400).json({msg:"Usuário já registrado"})
      }
      const password = await bcrypt.hash(senha, 8);
      const newUser = await User.create({
        name,
        email,
        password_hash:password
      });
      const token = await jwt.sign({ id:newUser.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.status(200).json({newUser, token});
    }catch(err){
      console.log(err);
      return res.status(400).json({msg:"Err"});
    }
  }
  async update(req,res){
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        msg: 'Corpo da requisição inválido ou as senha são diferentes',
      });
    }
    try{
      const { id } = req.params;
      const user= await User.findByPk(id);
      if(!user){
        return res.status(404).json({msg:"Usuário não encontrado"});
      }
      const { oldPassword, password } = req.body;
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(400).json({ msg: 'As senhas são diferentes' });
      }

      if(password){
        const senhaNova = await bcrypt.hash(password, 8);
        req.body.password_hash = senhaNova;
      }
      await user.update(req.body);
      return res.status(200).json({msg:"Usuario atualizado"});
    }catch(e){
      console.log(e);
      return res.status(400).json({msg:"Erro"})
    }
  }
}

export default new UserController();
