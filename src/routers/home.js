import { Router } from "express";
import { ProductController } from "../controllers/product.js";


const router = Router()

// Se verifica que el usuario tenga el token del log in activo
router.get("/", (req,res) => {
    res.send('servidor en Home')
})



export { router as HomeRouter }