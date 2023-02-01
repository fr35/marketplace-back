import { Router } from "express";



const router = Router()

router.get("/", (req,res) => {
    res.send('servidor en Home')
})



export { router as HomeRouter }