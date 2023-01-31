import { Router } from "express";
import { ProductController } from "../controllers/product.js";


const router = Router()

// Se verifica que el usuario tenga el token del log in activo
router.get("/", ProductController.getAll)



export { router as HomeRouter }