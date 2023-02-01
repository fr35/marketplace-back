import { Router } from "express";
import passport from "passport";
import {UserDao} from '../dao/index.js'
import bCrypt from "bcrypt";
import { JWT_UTILS } from '../utils/jwt.js'

const router = Router()
// Registro de usuario
router.post('/signup', async (req, res) => {
    try {
        const { name, lastname, username, email, password, phone, avatar, birth, address } = req.body
        // Para que llege toda la info del usuario
        if (!name || !lastname || !username || !email || !password || !phone || !birth || !address || !avatar) return res.send({ success: false })
        // Se busca si ya existe el usario en la base y se lo redirige al login
        const existUser = await UserDao.getOne({ email })
        if (existUser && existUser.password) {
            return res.send({ success: false, error: "el usuario ya existe" })
        }
        // Se guarda la password encriptada
        const passwordHash = await bCrypt.hash(password, 10)
        // Si existe el usario pero no tiene password (google, fb, tw, etc) se le guardan los nuevos datos
        if (existUser && !existUser.password) {
            const updateUser = await UserDao.updateById(existUser._id, {
                ...existUser,
                username,
                password: passwordHash,
                phone: phone,
                avatar: avatar,
                birth: birth,
                address: address
            });
            return res.send({ success: true });
        }
        // Se guarda en la db el usuario y luego se envia un mail avisando que se ingreso un nuevo usuario
        await UserDao.save({ name, lastname, username, email, password: passwordHash, phone, avatar, birth, address })
        res.send({ success: true })
        res.redirect('https://marketplace-back-production-3756.up.railway.app/login')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
})
// Log In mediante form, se crea una cookie con la sesion
router.post("/login", passport.authenticate("login"), async (req, res) => {
    try {
        const { user } = req
        const token = JWT_UTILS.createToken(user, 'secret')
        res.cookie('tokenUserCookie', token, { maxAge: 3600000 })
        res.send({ success: true });
        res.redirect('https://marketplace-back-production-3756.up.railway.app/')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
});

router.get("/github-login", passport.authenticate("github"))

router.get("/github/callback", passport.authenticate("github"), (req, res) => {
    try {
        const { user } = req
        const token = JWT_UTILS.createToken(user, 'secret')
        res.cookie('tokenUserCookie', token, { maxAge: 3600000 })
        res.redirect('https://marketplace-back-production-3756.up.railway.app/')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
});

router.get('/twitter-login', passport.authenticate('twitter'))

router.get("/twitter/callback", passport.authenticate("twitter"), (req, res) => {
    try {
        const { user } = req
        const token = JWT_UTILS.createToken(user, 'secret')
        res.cookie('tokenUserCookie', token, { maxAge: 3600000 })
        res.send({ success: true });
        res.redirect('https://marketplace-back-production-3756.up.railway.app/')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
})

router.get('/facebook-login', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))

router.get("/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    try {
        const { user } = req
        const token = JWT_UTILS.createToken(user, 'secret')
        res.cookie('tokenUserCookie', token, { maxAge: 3600000 })
        res.send({ success: true })
        res.redirect('https://marketplace-back-production-3756.up.railway.app/')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
})

router.get('/google-login', passport.authenticate('google'))

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    try {
        const { user } = req
        const token = JWT_UTILS.createToken(user, 'secret')
        res.cookie('tokenUserCookie', token, { maxAge: 3600000 })
        res.send({ success: true });
        res.redirect('https://marketplace-back-production-3756.up.railway.app/')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
})
// Log out se cierra la cookie
router.post("/logout", (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie("tokenUserCookie");
        res.send({ success: true });
        res.redirect('https://marketplace-back-production-3756.up.railway.app/login')
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
});

export { router as UserRouter }