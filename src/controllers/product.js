import { getSelectedDaos } from "../dao/index.js"
import { DATE_UTILS } from "../utils/date.js"
import {JOI_VALIDATOR} from "../utils/joi.js"

const getAll = async (req, res) => {
    try {
        const product = await getSelectedDaos.ProductDao.getAll()
        if (!product) {
            return res.send({ error: 'No hay productos disponibles' })
        }
        res.send(product)
    } catch (error) {
        console.log(error)
        res.send({ error: "Internal server error" })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await getSelectedDaos.ProductDao.getById(id)
        if (!product) {
            return res.send({ error: 'No se encontro el producto'})
        }
        res.send(product)
    } catch (error) {
        console.log(error)
        res.send({ error: "Internal server error" })
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock } = req.body
        const product = await JOI_VALIDATOR.product.validateAsync({
            title,
            description,
            thumbnail,
            price,
            stock,
            timestamp: DATE_UTILS.getTimestamp(),
        })
        const createdProduct = await getSelectedDaos.ProductDao.save(product)
        res.send(createdProduct)
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
}
const updateById = async (req,res) => {
    try {
        const { id } = req.params
        const { title, description, thumbnail, price, stock } = req.body
        const product = await getSelectedDaos.ProductDao.getById(id)
        if (!product) {
            return res.send({ error: 'No se encontro el producto'})
        }
        if(!title) {title = product.title}
        if(!description) {description = product.description}
        if(!thumbnail) {title = product.thumbnail}
        if(!price) {title = product.price}
        if(!stock) {title = product.stock}
        const updateProduct = await JOI_VALIDATOR.product.validateAsync({
            title: title,
            description: description,
            thumbnail: thumbnail,
            price: price,
            stock: stock,
            timestamp: DATE_UTILS.getTimestamp(),
        })
        const update = await getSelectedDaos.ProductDao.updateById(id, updateProduct)
        res.send(update)
    } catch (error) {
        console.log(error)
        res.send({success: false})
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        await getSelectedDaos.ProductDao.deleteById(id)
        res.send({ success: true })
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
}

export const ProductController = { getAll, getById, createProduct, deleteById, updateById }