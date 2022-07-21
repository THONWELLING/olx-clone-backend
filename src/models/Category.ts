import mongoose, { Schema, Document, Model } from 'mongoose'
mongoose.Promise = global.Promise

export interface ICategory extends Document {
  name: string,
  slug: String
}

const categorySchema: Schema = new Schema<ICategory>({
  name: String,
  slug: String
})

const modelName = "Category";
const isConnected = mongoose.connection;
const modelExists = mongoose.connection.models[modelName];
const modelExistsInConnection = isConnected && modelExists;

const Category = modelExistsInConnection
  ? mongoose.connection.models[modelName]
  : mongoose.model(modelName, categorySchema);

export default Category as Model<ICategory>;
