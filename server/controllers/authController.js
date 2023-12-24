import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
const register = async (req, res) => {
  try {
    // get user input
    const { username, email, password } = req.body;

    // validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    const oldUser = await pool.query(
      'SELECT * FROM "user_accounts" WHERE user_email = $1',
      [email]
    );

    if (oldUser.rows.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // encrypt user password
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // create user in database
    const newUser = await pool.query(
      'INSERT INTO "user_accounts" (user_type, user_name, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *',
      ["Author", username, email, encryptedPassword]
    );

    // check if user is created
    if (newUser.rows.length > 0) {
      return res.status(201).send("User Created");
    } else {
      return res.status(400).send("User Not Created");
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send("Error");
  }
};

const login = async (req, res) => {
  try {
    // get user input
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // check if user exist
    const user = await pool.query(
      'SELECT * FROM "user_accounts" WHERE user_email = $1',
      [email]
    );

    if (user.rows.length > 0) {
      // check if password matches
      if (await bcrypt.compare(password, user.rows[0].user_password)) {
        // create token
        const token = jwt.sign(
          { user_id: user.rows[0].user_id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "6h",
          }
        );

        const { user_password, ...other } = user.rows[0];

        // save token in cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          samesite : "strict",
          maxAge: 1000 * 60 * 60 * 6, // 6 hours
        });

        // response
        return res.status(200).json({ ...other});
      }
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err.message);
  }
};

export { register, login };
