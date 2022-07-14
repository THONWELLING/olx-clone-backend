import { Request, Response } from "express";
const State = require('../models/State') 
const User = require('../models/User') 
const Category = require('../models/Category') 
const Ad = require('../models/Ad') 



export const UserController = {
  getStates: async (req: Request, res: Response) => {
    let states = await State.find()
    res.json({ states })
  },

  info: async(req: Request, res: Response) => {
    let token = req.query.token

    const user = await User.findOne({ token })
    const state = await State.findById(user.state)
    const ads = await Ad.find({ idUser: user._id.toString() })

  //LISTA DE ANÚNCIOS
    let adList = []
    for (let i in ads) {
      
      const categories = await Category.findById(ads[i].category)
      adList.push({ ...ads[i], category: categories.slug })
    }

    return res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList
    })
  },

  editAction: async(req: Request, res: Response) => {

  }
}