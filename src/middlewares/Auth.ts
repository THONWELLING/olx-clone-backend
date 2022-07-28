import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    let success = false

    // Fazer verificação de auth
    if(req.body.token) {
      const token =  req.body.token
      // console.log("authType: ", authType)
      console.log("token:", token)

      if(token) {
        try {
          JWT.verify(token, process.env.JWT_SECRET as string)
          success = true
        } catch(err) { } 
      }
      success ? next() : res.json({ error: 'Not Authorized, Forbidden' })
    }

  }
}