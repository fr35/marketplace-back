import { Schema } from "mongoose";

const userCollection = "users";
const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, unique: true, required: true, max: 40},
    email: {type: String, required: true, unique: true,},
    password: {type: String, required: true, min: 8, max: 50},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    birth: {type: String, required: true},
    avatar: {type: String},
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    wishlist: {type: Schema.Types.ObjectId, ref: "carts" }
},
    { virtuals: true }
);

userSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response.__v;
        delete response._id;
        return response;
    },
});

export const userModel = { userCollection, userSchema };