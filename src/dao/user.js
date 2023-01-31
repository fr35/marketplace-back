import { MongoDBContainer } from "../containers/mongoDB.js";
import { userModel } from "../models/user.js";

export class UserMongo extends MongoDBContainer {
    constructor() {
        super({
            collection: userModel.userCollection,
            schema: userModel.userSchema,
        });
    }
}