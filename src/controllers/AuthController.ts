import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { validationResult, matchedData } from "express-validator";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv'

import User from '../models/User';
import State from '../models/State';


dotenv.config()


export const AuthController = {
  signIn: async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }
    const data = matchedData(req)

    //Validando o email
    let user = await User.findOne({ email: data.email })
    if (!user) {
      res.json({ error: 'Invalid Email And/Or Password!!!' })
      return
    }

    //Validando A Senha
    const match = await bcrypt.compare(data.password, user.passwordHash)
    if (!match) {
      res.json({ error: 'Invalid Email And/Or Password!!!' })
      return
    }

     let token = JWT.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '15d' }
    )
    user.token = token
    await user.save()

    res.json({ token, email:data.email })
  },

  signUp: async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }
    const data = matchedData(req)
    
    //verificando se email já existe
    let hasUser = await User.findOne({ email: data.email })
    //verificando se o estado existe
    if (mongoose.Types.ObjectId.isValid(data.state)) {
      
      const stateItem = await State.findById(data.state)
      if (!stateItem) {
        res.json({ error: {state:{msg: 'This State Does Not Exists'}} })
        return
      }
    } else {
      res.json({ error: {state:{msg: 'Invalid State Code'}} })
      return
    }
    if(!hasUser) {
      // criando um Hash para o password
      const passwordHash = bcrypt.hashSync(data.password, 10)

      //criando novo usuário
      const newUser = new User({
        name: data.name,
        email: data.email,
        passwordHash,
        state: data.state,
      })

      //criando token para o novo usuário
      let token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '15d' }
      )
      
      await newUser.save()
      res.status(201)
      res.json({ id: newUser.id, token })
      return 
    } else {
      res.json({ error: {email: {msg: 'Email Already Exists'}} })
      return
    }


    

   
    res.json({tudocerto: true, data})
  }
}