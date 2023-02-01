import { MongoDBService } from "../services/mongo.js";
import { ProductsMongo } from './product.js'
import { CartsMongo } from './cart.js'
import { ChatMongo } from "./chat.js";
import { UserMongo } from './user.js'

const getSelectedDaos = () => {
    MongoDBService.conectMongoDb()
        return {
            ProductDao: new ProductsMongo(),
            CartDao: new CartsMongo(),
            MessagesDao: new ChatMongo(),
            UserDao: new UserMongo()
        }
}
const {ProductDao, CartDao, MessagesDao, UserDao} = getSelectedDaos()
export { ProductDao, CartDao, MessagesDao, UserDao}