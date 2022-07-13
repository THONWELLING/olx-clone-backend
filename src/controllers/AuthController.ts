import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";



export const AuthController = {
  signIn: async(req: Request, res: Response) => {

  },

  signUp: async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }

    res.json({ tudoCerto: true })
  }
}