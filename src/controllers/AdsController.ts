import { Request, Response } from "express";
import  'uuid'


import Category, {ICategory} from '../models/Category';
import User, { IUser } from '../models/User';
import Ad, { IAd } from '../models/Ad';
import sharp from "sharp";

//MANIPULANDO E ADICIONANDO IMAGEM DE ANÚNCIO 
const addImage = async (req: Request, res: Response) => {
  if (req.file?.path) {
    await sharp(req.file?.path)
    .resize(500, 500)
    .toFormat('jpeg')
    .toFile(`./public/media/${req.file.filename}.jpg`)

    res.json({ image:`${req.file.filename}.jpg` })
  } else {
    res.status(400)
    res.json({error: 'invalid file'})
  }
}


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

  addAction: async(req: Request, res: Response) => {
      let { title, price, priceneg, desc, cat, token } = req.body
      const user = await User<IUser>.findOne({token})


      //VERIFICANDO SE TEM TÍTULO  E CATEGORIA * PQ SÃO OBRIGATÓRIOS
      if(!title || !cat) {
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
      newAd.views = 0

      
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

function uuid() {
  throw new Error("Function not implemented.");
}
