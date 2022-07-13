import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'
const User = require('../models/User')

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    // if(!req.query.token && req.body.token) {
    //   res.json({ notAllowed: true })
    //   return
    // }
    // let token = ''
    // if(req.query.token) {
    //   token = req.query.token
    // }

    // if (req.body.token) {
    //   token = req.body.token
    // }

    // if (token === '') {
    //   res.json({ notAllowed: true })
    //   return
    // }

    // const user = await User.finOne({ token })
    // if(!user) {
    //   res.json({ notAllowed: true })
    //   return
    // }

    //COM JWT
     //criando uma variável para teste 
    let success = false

    // Fazer verificação de auth
    if(req.headers.authorization) {
      const [authType, token] = req.headers.authorization.split( ' ' )
      if(authType === 'Bearer') {
        try {
          JWT.verify(token, process.env.JWT_SECRET as string)
          success = true
        } catch(err) {
          
        } 
      }

    }
    if(success) {
      next()
    } else {
    res.status(403) // Forbidden 
    res.json({ error: 'Not Authorized, Forbidden' })
  }

  }
}