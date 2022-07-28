import { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400)//bad request

  err instanceof MulterError ? 
  res.json({ error: err.code }) : 
  console.log(err)
  res.json({ error: 'Some Error Ocurred' })
  
}