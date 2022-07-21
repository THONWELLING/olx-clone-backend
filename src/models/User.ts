import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string,
  state: string,
  passwordHash: string,
  token: string
}

const userSchema: Schema = new Schema<IUser>({
  name: String,
  email: String,
  state: String,
  passwordHash: String,
  token: String
})

const modelName = "User";
const isConnected = mongoose.connection;
const modelExists = mongoose.connection.models[modelName];
const modelExistsInConnection = isConnected && modelExists;

const User = modelExistsInConnection
  ? mongoose.connection.models[modelName]
  : mongoose.model(modelName, userSchema);

export default User as Model<IUser>;

/* SOLUÇÃO SUGERIDA POR "LUCAS AKIRA AYABE"
  const isConnected = mongoose.connection;
const modelExists = mongoose.connection.models[modelName];
const modelExistsInConnection = isConnected && modelExists;

const model = modelExistsInConnection
    ? mongoose.connection.models[modelName]
    : mongoose.model(modelName, modelSchema);

export default model as Model<IUser, {}, {}, {}, any>;
 */