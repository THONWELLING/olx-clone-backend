import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IState extends Document {
  name: string
}

const stateSchema: Schema = new Schema<IState>({
  name: String
})


const modelName = "State";
const isConnected = mongoose.connection;
const modelExists = mongoose.connection.models[modelName];
const modelExistsInConnection = isConnected && modelExists;

const State = modelExistsInConnection
  ? mongoose.connection.models[modelName]
  : mongoose.model(modelName, stateSchema);

export default State as Model<IState>;


