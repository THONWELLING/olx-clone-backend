import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'
const User = require('../models/User')

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    
    /* VERSÃO SIMPLIFICADA COM IF
      if (req.query.token || req.body.token) {
        const token = req.query.token || req.body.token;
        if (token) {
          const user = await User.findOne({ token });
          if (user) return next();
        }
      }
      return res.json({ notallowed: true });
    */

    /*VERSÃO SIMPLIFICADA COM JWT */

     //criando uma variável para teste 
    let success = false

    // Fazer verificação de auth
    if(req.query.token || req.body.token) {
      const token = req.query.token || req.body.token
      if(token) {
        try {
          JWT.verify(token, process.env.JWT_SECRET as string)
          success = true
        } catch(err) { } 
      }
    }

    success ? next() : res.json({ error: 'Not Authorized, Forbidden' })

  }
}