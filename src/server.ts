import express, { Request, Response } from "express";
import mongoConnect from "./database/mongo";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from './routes'




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
server.use(fileUpload());


server.use('/', apiRoutes)

server.listen(process.env.PORT as string, () => {
  console.log(`Server is Running At The: ${process.env.BASE}`);
});
