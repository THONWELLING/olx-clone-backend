import express, { Request, Response } from 'express'
import multer from 'multer'

import { AuthController } from './controllers/AuthController'
import { AdsController } from './controllers/AdsController'
import { UserController } from './controllers/UserController'

import { Auth } from './middlewares/Auth'
import { authValidator } from './validators/AuthValidator'
import { UserValidator } from  './validators/UserValidator'


const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
    cb(null, allowed.includes(file.mimetype))
  },
  limits: { fileSize: 2000000}
})


const router = express.Router()

router.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: true })
})


//rotas de Estados
router.get('/states', UserController.getStates)

//Rotas de usuário
router.post('/user/signin', authValidator.signIn, AuthController.signIn)  //login
router.post('/user/signup', authValidator.signUp, AuthController.signUp)  //cadastro

router.get('/user/me', Auth.private, UserController.info) //informações
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction) // editar

//Rota de categorias
router.get('/categories', AdsController.getCategories) 

//Rotas de Anúncios
router.post('/ad/add', Auth.private, upload.array('images', 12), AdsController.addAction) // adicionar anúncio 
router.get('/ad/list', AdsController.getList)  //pegar lista de anúncios
router.get('/ad/item', AdsController.getItem)  // adicionar um item
router.post('/ad/:id', Auth.private, AdsController.editAction)  // editar anúncio

export default  router