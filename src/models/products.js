import { Schema } from "mongoose"

const productCollections = "products"
const productSchema = new Schema({
    title: {type: String, required: true, max: 70, min: 3},
    description: {type: String, required: true, max: 300, min: 3},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true, default: 1},
    timestamp: {type: String, required: true},
}, {
    virtuals: true
})

productSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response.__v;
        delete response._id;
        return response;
    },
});

export const productModel = {productCollections, productSchema}