import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


// confgiure dotenv
dotenv.config();

const PORT = process.env.PORT || 3000;

// create express app
const app = express();

// enable cors
app.use(cors(
    {
        origin: '*'
    }
));

// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


