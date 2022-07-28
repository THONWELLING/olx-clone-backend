import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

import State,{ IState} from '../models/State'; 
import User, { IUser } from '../models/User'; 
import Category, { ICategory } from '../models/Category'; 
import Ad, { IAd } from '../models/Ad'; 




type Updates = {
  name?: string
  email?: string
  passwordHash?: string
  state?: string
}


export const UserController = {
  getStates: async (req: Request, res: Response) => {
    let states = await State.find()
    res.json({ states })
  },

  info: async (req: Request, res: Response ) => {
    const token = req.body.token

    console.log('token do userController info: ', token)
    const user = await User<IUser>.findOne({ token })
    console.log('USER: ', user)
    const state = await State<IState>.findById(user?.state)
    const ads = await Ad<IAd>.find({ idUser: user?._id.toString()})

   //LISTA DE ANÚNCIOS
    let adList = []
    for (let i in ads) {
      const cat = await Category<ICategory>.findById(ads[i].category)
      adList.push({ ...ads[i], category: cat?.slug })
    }

    return res.json({
      name: user?.name,
      email: user?.email,
      state: state?.name,
      ads: adList
    })
  
  },

  editAction: async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }
    const data = matchedData(req)

    console.log("INFORMAÇÕES DO DATA  EDITACTION => ", data)
    console.log("TOKEN DO EDIT ACTION => ", data.token)
      let updates: Updates = {...data}

      if (data.name) {
        updates.name = data.name
      }
      if (data.email) {
        const emailCheck = await User<IUser>.findOne({ email: data.email })
        if(emailCheck) {
          res.json({ error: 'There Is Already A User With This Email' })
          return
        }
        updates.email = data.email
      }

      if(data.state) {
        if (mongoose.Types.ObjectId.isValid(data.state)) {
          const stateCheck = await State<IState>.findById(data.state)
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

    await User<IUser>.findOneAndUpdate({ token: data.token}, {$set: updates})
    res.json({})

  }
}