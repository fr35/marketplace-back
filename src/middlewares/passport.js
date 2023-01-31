import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { getSelectedDaos } from "../dao/index.js";
import bCrypt from "bcrypt"
import {config} from '../config/index.js'

const init = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await getSelectedDaos.UserDao.getById(id)
        done(null, user)
    })
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            if (!email || !password) return done(null, false)
            const user = await getSelectedDaos.UserDao.getOne({ email: email })
            if (!user) return done(null, false)
            const checkPassword = await bCrypt.compare(password, user.password)
            if (!checkPassword) return done(null, false)
            const userResponse = {
                id: user._id,
                email: user.email,
                username: user.username,
                cart: user.cart,
                whislist: user.whislist
            }
            done(null, userResponse)
        } catch (error) {
            console.log(error)
            done(error)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: config.PASSPORT.github.clientId,
        clientSecret: config.PASSPORT.github.clientSecret,
        callbackURL: config.PASSPORT.github.callbackURL,
        scope: ["user:email"],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const githubEmail = profile.emails?.[0].value
            if (!githubEmail) return done(null, false)
            const user = await getSelectedDaos.UserDao.getOne({ email: githubEmail })
            if (user) {
                const userResponse = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    cart: user.cart,
                    whislist: user.whislist
                }
                return done(null, userResponse)
            }
            const newUser = {
                email: githubEmail,
                name: profile._json.name,
                lastname: "-",
                username: profile.username
            }
            const createdUser = await getSelectedDaos.UserDao.save(newUser)
            const userResponse = {
                id: createdUser._id,
                email: createdUser.email,
                username: createdUser.username,
                cart: createdUser.cart,
                whislist: createdUser.whislist,
            }
            done(null, userResponse);
        } catch (error) {
            console.log(error)
            done(error)
        }
    }))

    passport.use('twitter', new TwitterStrategy({
        consumerKey: config.PASSPORT.twitter.apiKey,
        consumerSecret: config.PASSPORT.twitter.apiKeySecret,
        callbackURL: config.PASSPORT.twitter.callbackURL,
        includeEmail: true
    }, async (token, tokenSecret, profile, cb) => {
        try {
            const twitterEmail = profile.emails?.[0].value
            if (!twitterEmail) return cb(null, false)
            const user = await getSelectedDaos.UserDao.getOne({ email: twitterEmail })
            if (user) {
                const userResponse = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    cart: user.cart,
                    whislist: user.whislist
                }
                return cb(null, userResponse)
            }
            const newUser = {
                email: twitterEmail,
                name: profile._json.name,
                username: profile.username,
                lastname: "-",
            }
            const createdUser = await getSelectedDaos.UserDao.save(newUser)
            const userResponse = {
                id: createdUser._id,
                email: createdUser.email,
                username: createdUser.username,
                cart: createdUser.cart,
                whislist: createdUser.whislist,
            }
            cb(null, userResponse)
        } catch (error) {
            console.log(error)
            cb(error)
        }
    }))

    passport.use('facebook', new FacebookStrategy({
        clientID: config.PASSPORT.facebook.clientId,
        clientSecret: config.PASSPORT.facebook.clientSecret,
        callbackURL: config.PASSPORT.facebook.callbackURL,
        profileFields: ['id', 'emails', 'name']
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            const facebookEmail = profile._json.email
            if (!facebookEmail) return cb(null, false)
            const user = await getSelectedDaos.UserDao.getOne({ email: facebookEmail })
            if (user) {
                const userResponse = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    cart: user.cart,
                    whislist: user.whislist
                }
                return cb(null, userResponse)
            }
            const newUser = {
                email: facebookEmail,
                name: profile._json.first_name,
                lastname: profile._json.last_name,
                username: '-',
            }
            const createdUser = await getSelectedDaos.UserDao.save(newUser)
            const userResponse = {
                id: createdUser._id,
                email: createdUser.email,
                username: createdUser.username,
                cart: createdUser.cart,
                whislist: createdUser.whislist,
            }
            cb(null, userResponse)
        } catch (error) {
            console.log(error)
            cb(error)
        }
    }))

    passport.use('google', new GoogleStrategy({
        clientID: config.PASSPORT.google.clientId,
        clientSecret: config.PASSPORT.google.clientSecret,
        callbackURL: config.PASSPORT.google.callbackURL,
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            const googleEmail = profile.emails?.[0].value
            if (!googleEmail) return cb(null, false)
            const user = await getSelectedDaos.UserDao.getOne({ email: googleEmail })
            if (user) {
                const userResponse = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    cart: user.cart,
                    whislist: user.whislist
                }
                return cb(null, userResponse)
            }
            const newUser = {
                email: googleEmail,
                name: profile._json.given_name,
                lastname: profile._json.family_name,
            }
            const createdUser = await getSelectedDaos.UserDao.save(newUser)
            const userResponse = {
                id: createdUser._id,
                email: createdUser.email,
                username: createdUser.username,
                cart: createdUser.cart,
                whislist: createdUser.whislist,
            }
            cb(null, userResponse);
        } catch (error) {
            console.log(error)
            cb(error)
        }
    }))
}

export const PassportAuth = {
    init,
};