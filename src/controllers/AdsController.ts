import { Request, Response } from "express";


const Category = require('../models/Category')
const User = require('../models/User')
const Ad = require('../models/Ad')


export const AdsController = {
  getCategories: async(req: Request, res: Response) => {
    const cats = await Category.find()

    let categories =[]
    for(let i in cats) {
      categories.push({
        ...cats[i]._doc,
        img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
      })
    }

    res.json({ categories })
  },

  addAction: async(req: Request, res: Response) => {
      let { title, price, priceneg, desc, cat, token } = req.body
      const user = await User.findOne({token}).exec()

      if(!title || !cat) {
        res.json({ error: 'Title And/Or Category Are Not Filed' })
        return
      }

      if (price) {
        price = price.replace('.', '').replace(',', '.').replace('R$ ', '')
        price = parseFloat(price)
      } else {
        price = 0
      }

      const newAd = new Ad()
      newAd.status = true
      newAd.idUser = user._id
      newAd.state = user.state
      newAd.dateCreated = new Date()
      newAd.title = title
      newAd.price = price
      newAd.priceNegotiable = (priceneg === 'true' ) ? true : false
  },

  getList: async(req: Request, res: Response) => {

  },

  getItem: async(req: Request, res: Response) => {

  },

  editAction: async(req: Request, res: Response) => {

  },
  
}