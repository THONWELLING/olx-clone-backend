import { Request, Response } from "express";
import { v4 } from 'uuid'
import Jimp from "jimp/*";

import Category, {ICategory} from '../models/Category';
import User, { IUser } from '../models/User';
import Ad, { IAd } from '../models/Ad';


export const AdsController = {
  getCategories: async(req: Request, res: Response) => {
    const cats = await Category<ICategory>.find()
    console.log("Categorias: ", cats)
    let categories =[]

    for(let i in cats) {
      categories.push({
        ...cats[i],
        img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
      })
    }

    res.json({ categories })
  },

  addAction: async(req: Request, res: Response) => {
      // let { title, price, priceneg, desc, cat, token } = req.body
      // const user = await User<IUser>.findOne({token}).exec()

      // if(!title || !cat) {
      //   res.json({ error: 'Title And/Or Category Are Not Filed' })
      //   return
      // }

      // if (price) {
      //   price = price.replace('.', '').replace(',', '.').replace('R$ ', '')
      //   price = parseFloat(price)
      // } else {
      //   price = 0
      // }

      // const newAd = new Ad<IAd>()
      // newAd.status = true
      // newAd.idUser = user._id
      // newAd.state = user.state
      // newAd.dateCreated = new Date()
      // newAd.title = title
      // newAd.price = price
      // newAd.priceNegotiable = (priceneg === 'true' ) ? true : false
      // newAd.description = desc
      // newAd.views = 0

      // if (req.files && req.files.img) {
      //   if(req.files.img.length == undefined) {

      //   }
      // }

      // const info = await newAd.save()
      // res.json({ id: info._id })
  },

  getList: async(req: Request, res: Response) => {

  },

  getItem: async(req: Request, res: Response) => {

  },

  editAction: async(req: Request, res: Response) => {

  },
  
}