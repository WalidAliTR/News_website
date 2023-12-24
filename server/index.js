import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { checkConnection , pool} from "./db/db.js";
import {v2 as cloudinary} from 'cloudinary';

import authRoute from "./routes/authRoute.js";
import newsRoute from "./routes/newsRoute.js";

// check database connection
checkConnection().then((isConnected) => {
    if (isConnected) {
      console.log("PostgreSQL connection is successful.");
    } else {
      console.log("Unable to connect to PostgreSQL.");
    }
});

// confgiure dotenv
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 3000;

// create express app
const app = express();

// enable cors
app.use(
  cors({
    origin: "*",
  })
);

// parse application/json
app.use(express.json(
  {limit: '50mb'}
));
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser());


// async function Test() {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM \"user_accounts\"");
//     client.release();
//     console.log(result.rows);
// }


app.use("/api/auth", authRoute);
app.use("/api/news", newsRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
});