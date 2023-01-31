import session from 'express-session'
import MongoStore from 'connect-mongo'
import {config} from '../config/index.js'

const mongoOptions={useNewUrlParser:true, useUnifiedTopology:true}
const mongoURI = config.DATABASES.mongo.dbUri

const sessions = {
    mongo: session({
        store: MongoStore.create({
            mongoUrl: `${mongoURI}`,
            mongoOptions,
            ttl:600,
            collectionName:'sessions'
        }),
        secret:'secret',
        resave: false,
        saveUninitialized: false
    })
}

export {sessions}