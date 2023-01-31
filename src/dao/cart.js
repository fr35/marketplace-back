import {MongoDBContainer} from "../containers/mongoDB.js"
import {cartModel} from "../models/cart.js"

export class CartsMongo extends MongoDBContainer {
    constructor() {
        super({
            collection: cartModel.cartCollections,
            schema: cartModel.cartSchema
        })
    }
}
