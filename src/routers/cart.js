import { Router } from "express"
import { DATE_UTILS } from "../utils/date.js"
import { getSelectedDaos } from "../dao/index.js"

const router = Router()

//Busca un carrito
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const cart = await getSelectedDaos.CartDao.getById(id)
        res.send({ success: true, cart })
    } catch (error) {
        console.log(error)
        res.send({ succes: false })
    }
})
//Crea un carrito
router.post("/", async (req, res) => {
    try {
        const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
        const cart = await getSelectedDaos.CartDao.save(baseCart)
        res.send({ success: true, cartId: cart.id })
    } catch (error) {
        console.log(error)
        res.send({ succes: false })
    }
});

router.post("/:cartId/products", async (req, res) => {
    try {
        const { productId } = req.body
        const { cartId } = req.params
        const cart = await getSelectedDaos.CartDao.getById(cartId)
        if (!cart)
            return res.send({ error: true, message: 'No se encontro el carrito' })
        const product = await getSelectedDaos.ProductDao.getById(productId)
        if (!product)
            return res.send({ error: true, message: 'No se encontro el producto' })
        cart.products.push(product)
        const updatedCart = await getSelectedDaos.CartDao.updateById(cartId, cart)
        res.send({ success: true, cart: updatedCart })
    } catch (error) {
        console.log(error)
        res.send({ succes: false })
    }
})

export { router as CartRouter }