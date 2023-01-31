import {MongoDBContainer} from "../containers/mongoDB.js"
import {productModel} from "../models/products.js"
export class ProductsMongo extends MongoDBContainer {
    constructor() {
        super({
            collection: productModel.productCollections,
            schema: productModel.productSchema
        })
    }
}