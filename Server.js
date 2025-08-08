import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import bodyParser from 'body-parser' 
import colors from 'colors'
import cors from 'cors'
import connectedDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

connectedDB();

const app=express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

const PORT=process.env.PORT
const DEV_MODE=process.env.DEV_MODE
app.use('api/v1/auth', authRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${DEV_MODE} mode on port no ${PORT}`.bgCyan)
})