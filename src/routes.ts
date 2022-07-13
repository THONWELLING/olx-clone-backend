import express, { Request, Response } from 'express'

import { AuthController } from './controllers/AuthController'
import { AdsController } from './controllers/AdsController'
import { UserController } from './controllers/UserController'


const router = express.Router()

router.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: true })
})


//rotas de Estados
router.get('/states', UserController.getStates)

//Rotas de usuário
router.post('/user/signin', AuthController.signIn)  //login
router.post('/user/signup', AuthController.signUp)  //cadastro

router.get('/user/me', UserController.info) //informações
router.put('/user/me', UserController.editAction) // editar

//Rota de categorias
router.get('/categories', AdsController.getCategories) 

//Rotas de Anúncios
router.post('/ad/add', AdsController.addAction) // adicionar anúncio 
router.get('/ad/list', AdsController.getList)  //pegar lista de anúncios
router.get('/ad/item', AdsController.getItem)  // adicionar um item
router.post('/ad/:id', AdsController.editAction)  // editar anúncio

export default  router