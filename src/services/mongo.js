import mongoose from "mongoose"
import {config} from '../config/index.js'

const conectMongoDb = async () => {
    try {
        mongoose.connect(config.DATABASES.mongo.url, {
            dbName: config.DATABASES.mongo.dbName
        })
    } catch(error) {
        console.log(error)
    }
}
export const MongoDBService = {
    conectMongoDb
}