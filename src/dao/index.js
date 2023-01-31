import { MongoDBService } from "../services/mongo.js";
import { ProductsMongo } from './product.js'
import { CartsMongo } from './cart.js'
import { ChatMongo } from "./chat.js";
import { UserMongo } from './user.js'
import {config} from '../config/index.js'

const getSelectedDaos = () => {
    MongoDBService.conectMongoDb()
    switch (config.SERVER.SELECTED_DATABASE) {
        case "mongo": {
            MongoDBService.conectMongoDb()
            return {
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo(),
                MessagesDao: new ChatMongo(),
                UserDao: new UserMongo()
            }
        }
    }
}
export {getSelectedDaos}