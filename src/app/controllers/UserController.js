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
      const {id, name, email } = await User.create({
        name,
        email,
        password_hash:password
      });
      const token = await jwt.sign({ id_aluno }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.status(200).json({aluno:{id, name, email}, token});
    }catch(err){
      return res.status(400).json({msg:"Err"});
    }
  }
  async update(req,res){
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      nome: Yup.string(),
      senhaAntiga: Yup.string().min(6),
      senha: Yup.string()
        .min(6)
        .when('oldPassword', (senhaAntiga, field) =>
          senhaAntiga ? field.required() : field
        ),
      confirmacaoSenha: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
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
      const { senhaAntiga, senha } = req.body;
      if (senhaAntiga && !(await aluno.checkPassword(senhaAntiga))) {
        return res.status(400).json({ msg: 'As senhas são diferentes' });
      }

      if(senha){
        const senhaNova = await bcrypt.hash(senha, 8);
        req.body.senha = senhaNova;
      }
      await user.update(req.body);
      return res.status(200).json({msg:"Usuario atualizado"});
    }catch(e){
      return res.status(400).json({msg:"Erro"})
    }
  }
}

export default new UserController();
