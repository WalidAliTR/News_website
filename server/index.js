import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { checkConnection , pool} from "./db/db.js";
import authRoute from "./routes/authRoute.js";


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
app.use(express.json());
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
});