import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT : process.env.PORT || 4000,
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://localhost:5500/banking"

}

export default config


