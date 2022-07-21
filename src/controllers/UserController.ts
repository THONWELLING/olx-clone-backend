import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

import State from '../models/State'; 
import User, { IUser } from '../models/User'; 
import Category from '../models/Category'; 
import Ad from '../models/Ad'; 





export const UserController = {
  getStates: async (req: Request, res: Response) => {
    let states = await State.find()
    res.json({ states })
  },

  info: async (req: Request, res: Response ) => {
    const token = req.headers.authorization?.split(' ')[1] as string

    
    const user = await User<IUser>.findOne({where: { token }})
    console.log('USER: ', user)
    const state = await State.findById(user.state)
    const ads = await Ad.find({ idUser: user._id.toString() })

   //LISTA DE ANÚNCIOS
    let adList = []
    for (let i in ads) {
      
      const cat = await Category.findById(ads[i].category)
      adList.push({ ...ads[i], category: cat.slug })
    }

    return res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList
    })
   res.json({})
  },

  editAction: async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }
    const data = matchedData(req)

    const user = await User.findOne({ token: data.token })

      let updates = {...data}

      if (data.name) {
        updates.name = data.name
      }
      if (data.email) {
        const emailCheck = await User.findOne({ email: data.email })
        if(emailCheck) {
          res.json({ error: 'There Is Already A User With This Email' })
          return
        }
        updates.email = data.email
      }

      if(data.state) {
        if (mongoose.Types.ObjectId.isValid(data.state)) {
          
          const stateCheck = await State.findById(data.state)
          if(!stateCheck) {
            res.json({ error: 'Invalid State' })
            return
          }
          updates.state = data.state 
        }
      }

      if (data.password) {
        updates.passwordHash = await bcrypt.hash(data.password, 10)
      }

    await User.findOneAndUpdate({ token: data.token}, {$set: updates})

  }
}