import mongoose, { Schema, Document, Model } from 'mongoose'



export interface IAd extends Document {
  idUser: String,
  state: String,
  category: String,
  images: [Object],
  dateCreated: Date,
  title: String,
  price: Number,
  priceNegotiable: Boolean,
  description: String,
  views: Number,
  status: Boolean
}


const adSchema: Schema = new Schema<IAd>({
  idUser: String,
  state: String,
  category: String,
  images: [Object],
  dateCreated: Date,
  title: String,
  price: Number,
  priceNegotiable: Boolean,
  description: String,
  views: Number,
  status: Boolean
})

const modelName = "Ad";
const isConnected = mongoose.connection;
const modelExists = mongoose.connection.models[modelName];
const modelExistsInConnection = isConnected && modelExists;

const Ad = modelExistsInConnection
  ? mongoose.connection.models[modelName]
  : mongoose.model(modelName, adSchema);

export default Ad as Model<IAd>;
