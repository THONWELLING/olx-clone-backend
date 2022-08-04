import { unlink } from "fs/promises";
import { Request, Response } from "express";



import Category, {ICategory} from '../models/Category';
import User, { IUser } from '../models/User';
import Ad, { IAd } from '../models/Ad';
import State, {IState} from "../models/State";
import sharp from "sharp";



// type Data = {
//   title: string
//   category: string
//   price: string
//   state: string
//   priceNegotiable: string
//   description: string
//   delImages?: string
//   status?: string
// }



export const AdsController = {
  getCategories: async(req: Request, res: Response) => {

    //PEGANDO AS CATEGORIAS NOBANCO DE DADOS 
    const cats = await Category<ICategory>.find()
    console.log("Categorias: ", cats)
    let categories =[]

    //MONTANDO E INSERINDO URL DE IMAGENS DAS CATEGORIAS 
    for(let i in cats) {
      categories.push({
        ...cats[i],
        img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
      })
    }

    res.json({ categories })
  },

  addAction: async( req: Request, res: Response) => {
    let { title, price, priceneg, desc, cat, token } = req.body

    const user = await User<IUser>.findOne({token})


    //VERIFICANDO SE TEM TÍTULO  E CATEGORIA * PQ SÃO OBRIGATÓRIOS
    if(!title || !Category) {
      res.json({ error: 'Title And/Or Category Are Not Filed' })
      return
    }

    //FORMATANDO O VALOR DO PREÇO
    if (price) {
      price = price.replace('.', '').replace(',', '.').replace('R$ ', '')
      price = parseFloat(price)
    } else {
      price = 0
    }


    //imagens
     let images: string[]= []

    if (req.files) {
      let files = req.files as Express.Multer.File[]

      files.forEach( async (item) => {
        images.push(item.filename)
        await sharp(item.path)
        .resize(500, 500)
        .toFormat("jpeg")
        .toFile(`./public/media/${item.filename}.jpg`)

        await unlink (item.path)
        
        res.json({ images:`${item.filename}` })
      })
    } else {
        res.status(400)
        res.json({error: 'invalid file'})
    }

      //ADICIONANDO NOVO ANÚNCIO 
      const newAd = new Ad<IAd>()
      newAd.status = true
      newAd.idUser = user?._id
      newAd.state = user?.state as string
      newAd.dateCreated = new Date()
      newAd.title = title
      newAd.category = cat
      newAd.price = price
      newAd.priceNegotiable = (priceneg === 'true' ) ? true : false
      newAd.description = desc
      newAd.views = 0,
      images
      

      const info = await newAd.save()
      res.json({ id: info._id })
  },

  getList: async(req: Request, res: Response) => {

  },

  getItem: async(req: Request, res: Response) => {

  },

  editAction: async(req: Request, res: Response) => {

  },
  
}
