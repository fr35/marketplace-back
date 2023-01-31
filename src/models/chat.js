import { Schema } from "mongoose"

const chatCollections = "chat"
const chatSchema = new Schema({
    text: {type: String, required: true, max: 300, min: 10},
    author: [{type: Schema.Types.ObjectId, ref: "users"}]
}, {
    virtuals: true
})

chatSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id
        delete response._id
        return response
    }
})

export const chatModel = {chatCollections, chatSchema}