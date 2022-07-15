import { Request, Response } from "express";


const Category = require('../models/Category')


export const AdsController = {
  getCategories: async(req: Request, res: Response) => {
    const cats = await Category.find()

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

  },

  getList: async(req: Request, res: Response) => {

  },

  getItem: async(req: Request, res: Response) => {

  },

  editAction: async(req: Request, res: Response) => {

  },
  
}