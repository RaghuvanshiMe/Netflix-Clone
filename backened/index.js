import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import databaseconnection from './utils/dataBase.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

dotenv.config({
    path:".env"
})

databaseconnection();




const app = express();

//middlewares
app.use(urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on :${process.env.PORT}`);
});