import { Request, Response } from "express";
const State = require('../models/State') 

export const UserController = {
  getStates: async (req: Request, res: Response) => {
    let states = await State.find()
    res.json({ states })
  },

  info: async(req: Request, res: Response) => {

  },

  editAction: async(req: Request, res: Response) => {

  }
}