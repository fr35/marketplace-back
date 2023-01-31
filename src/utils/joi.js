import joi from "joi";

const product = joi.object({
    title: joi.string().min(3).max(70).required(),
    description: joi.string().min(3).max(300).required(),
    thumbnail: joi.string().required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    timestamp: joi.string().required(),
})

export const JOI_VALIDATOR = {product}