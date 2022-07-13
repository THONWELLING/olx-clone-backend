import { NextFunction, Request, Response } from "express";
const User = require('../models/User')

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    if(!req.query.token && req.body.token) {
      res.json({ notAllowed: true })
      return
    }
    let token = ''
    if(req.query.token) {
      token = req.query.token
    }

    if (req.body.token) {
      token = req.body.token
    }

    if (token === '') {
      res.json({ notAllowed: true })
      return
    }

    const user = await User.finOne({ token })
    if(!user) {
      res.json({ notAllowed: true })
      return
    }
  }
}