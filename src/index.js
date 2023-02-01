import express from "express";
import cookieParser from "cookie-parser"
import {sessions} from './session/mongo.js'
import passport from "passport";
import cors from "cors"
import {ProductRouter} from './routers/product.js'
import {CartRouter} from './routers/cart.js'
import {UserRouter} from './routers/user.js'
import { PassportAuth } from "./middlewares/passport.js";
import { HomeRouter } from "./routers/home.js";

const PORT = process.env.PORT 
const app = express();

PassportAuth.init()

app.use(cookieParser())
app.use(sessions.mongo)
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use('/', HomeRouter)
app.use('/auth', UserRouter)
app.use("/products", ProductRouter)
app.use("/cart", CartRouter)

const server = app.listen(PORT, () =>
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
)
server.on('error', error => console.log(`Error en servidor: ${error}`))
