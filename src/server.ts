import express, { Request, Response } from "express";
import 'express-async-errors'
import mongoConnect from "./database/mongo";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from './routes'


import { errorHandler } from './middlewares/multerErrors'



dotenv.config();

mongoConnect();
mongoose.Promise = global.Promise
mongoose.connection.on('error', (error) => {
  console.log('Error: ', error.message)
})

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname + "public")));
server.use(express.urlencoded({ extended: true }));



server.use('/', apiRoutes)

server.use((req: Request, res: Response) => {
  res.status(404)
  res.json({ error: 'Endpoint Not Found' })
})


server.use(errorHandler)

server.listen(process.env.PORT as string, () => {
  console.log(`Server is Running At The: ${process.env.BASE}`);
});
