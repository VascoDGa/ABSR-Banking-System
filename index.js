import config from './src/config/index.js'
import mongoose from 'mongoose'
import cors from "cors"
import cookieParser from 'cookie-parser'
import express from "express"
import bodyParser from 'body-parser'
import routes from './src/routes/index.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api/v1' , routes)

app.use((req, res, next) => {  //http:localhost:4000/api/v1/
    // Check if the route is not found
    if (!res.headersSent) {
      return res.status(404).json({
        success: false,
        message: "Route not found"
      });
    }
  
    // Proceed to the next middleware or error handler
    next();
  });
  


(
    async () => {
        try {
            await mongoose.connect(config.MONGODB_URL)
            console.log("Database connected successfully")

            app.on("error" , (err) => {
                console.error(err);
                throw err
            })

            app.listen(config.PORT, () => {
                console.log(`Server listening on port ${config.PORT}`)
            })
        }
        catch (err) {
            console.error(err);
            throw err
        }
    }
)()


