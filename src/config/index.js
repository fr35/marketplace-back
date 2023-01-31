import dotenv from "dotenv"
dotenv.config()

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
        SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
    },
    DATABASES: {
        mongo: {
            url: process.env.MONGO_DB_URL,
            dbName: process.env.MONGO_DB_NAME,
            dbUri: process.env.MONGO_DB_URI
        }
    },
    PASSPORT: {
        github: {
            clientId: process.env.CLIENT_ID_GITHUB,
            clientSecret: process.env.CLIENT_SECRET_GITHUB,
            callbackURL: process.env.CALLBACK_URL_GITHUB
        },
        twitter: {
            apiKey: process.env.API_KEY_TWITTER,
            apiKeySecret: process.env.API_KEY_SECRET_TWITTER,
            callbackURL: process.env.CALLBACK_URL_TWITTER
        },
        facebook: {
            clientId: process.env.CLIENT_ID_FACEBOOK,
            clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
            callbackURL: process.env.CALLBACK_URL_FACEBOOK,
        },
        google: {
            clientId: process.env.CLIENT_ID_GOOGLE,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE,
            callbackURL: process.env.CALLBACK_URL_GOOGLE,
        }
    },
    GMAIL : {
        name: process.env.GMAIL_NAME,
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASSWORD
    },
    WHATSAPP : {
        user: process.env.WHATSAPP_USER,
        password: process.env.WHATSAPP_PASSWORD,
        number: process.env.WHATSAPP_NUMBER
    }
}

export { config }