import express, { Request, Response } from "express";
import mongoConnect from "./database/mongo";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();

mongoConnect();

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname + "public")));
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());


server.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

server.listen(process.env.PORT as string, () => {
  console.log(`Server is Running At The: ${process.env.BASE}`);
});
