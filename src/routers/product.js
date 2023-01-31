import { Router } from "express";
import { ProductController } from "../controllers/product.js";
import {isValidToken} from "../middlewares/validToken.js"

const router = Router()

// Se verifica que el usuario tenga el token del log in activo
router.get("/", isValidToken ,ProductController.getAll)
router.get("/:id", isValidToken,ProductController.getById)
router.post("/", isValidToken,ProductController.createProduct)
router.delete("/:id", isValidToken,ProductController.deleteById)


export { router as ProductRouter }