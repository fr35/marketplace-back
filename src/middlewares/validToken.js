import { UserDao} from '../dao/index.js'
import { JWT_UTILS } from '../utils/jwt.js'

const isValidToken = async(req, res, next) => {
    try {
        const {tokenUserCookie} = req.cookies
        if(!tokenUserCookie) {
            throw new Error('Unauthorized')
        } 
        const verifiedTokenUser = JWT_UTILS.verifyToken(tokenUserCookie, 'secret')
        if(!verifiedTokenUser) {
            throw new Error('Unauthorized')
        }
        const user = await UserDao.getById(verifiedTokenUser.id)
        if(!user) {
            throw new Error('Unauthorized')
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send('Unauthorized')
    }
}

export {isValidToken}