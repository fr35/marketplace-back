import {MongoDBContainer} from "../containers/mongoDB.js"
import {chatModel} from "../models/chat.js"

export class ChatMongo extends MongoDBContainer {
    constructor() {
        super({
            collection: chatModel.chatCollections,
            schema: chatModel.chatSchema
        })
    }
}