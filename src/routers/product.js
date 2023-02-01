import { Router } from "express";
import { ProductController } from "../controllers/product.js";
import {isValidToken} from "../middlewares/validToken.js"

const router = Router()

// Se verifica que el usuario tenga el token del log in activo
router.get("/", ProductController.getAll)
router.get("/:id", ProductController.getById)
router.post("/", ProductController.createProduct)
router.post('/:id/update', ProductController.updateById)
router.delete("/:id", isValidToken,ProductController.deleteById)


export { router as ProductRouter }