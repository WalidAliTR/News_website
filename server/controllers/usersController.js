import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "user_accounts"');
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM "user_accounts" WHERE "user_PK" = $1',
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  let {
    user_about,
    user_email,
    user_password,
    social_media_links,
    user_picture,
  } = req.body;

  try {
    const selectedUser = await pool.query(
      'SELECT * FROM "user_accounts" WHERE "user_PK" = $1',
      [id]
    );


    if (user_about == "") {
      if (selectedUser.rows[0].about_user == null) {
        user_about = "";
      } else {
        user_about = selectedUser.rows[0].about_user;
      }
    }
    if (user_email == "") {
      if (selectedUser.rows[0].user_email == null) {
        user_email = "";
      } else {
        user_email = selectedUser.rows[0].user_email;
      }
    }

    if (social_media_links == "") {
      if (selectedUser.rows[0].social_media_links == null) {
        social_media_links = "";
      } else {
        social_media_links = selectedUser.rows[0].social_media_links;
      }
    }

    let query = "";
    let queryValues = [];

    if (user_picture == null) {
      user_picture = selectedUser.rows[0].user_picture;
      if (user_password == "") {
        query =
          'UPDATE "user_accounts" SET  about_user = $1, user_email = $2, social_media_links = $3 WHERE "user_PK" = $4 RETURNING *';
        queryValues = [user_about, user_email, social_media_links, id];
      } else {
        const saltRounds = 10;
        user_password = await bcrypt.hash(user_password, saltRounds);
        query =
          'UPDATE "user_accounts" SET  about_user = $1, user_email = $2, social_media_links = $3, user_password = $4 WHERE "user_PK" = $5 RETURNING *';
        queryValues = [
          user_about,
          user_email,
          social_media_links,
          user_password,
          id,
        ];
      }
    } else {
      const uploadedResponse = await cloudinary.uploader.upload(user_picture);
      user_picture = uploadedResponse.secure_url;
      if (user_password == "") {
        query =
          'UPDATE "user_accounts" SET  about_user = $1, user_email = $2, social_media_links = $3, user_picture = $4 WHERE "user_PK" = $5 RETURNING *';
        queryValues = [
          user_about,
          user_email,
          social_media_links,
          user_picture,
          id,
        ];
      } else {
        const saltRounds = 10;
        user_password = await bcrypt.hash(user_password, saltRounds);
        query =
          'UPDATE "user_accounts" SET  about_user = $1, user_email = $2, social_media_links = $3, user_picture = $4, user_password = $5 WHERE "user_PK" = $6 RETURNING *';
        queryValues = [
          user_about,
          user_email,
          social_media_links,
          user_picture,
          user_password,
          id,
        ];
      }
    }

    const updatedUser = await pool.query(query, queryValues);
    res.status(200).send({
      msg: "User updated successfully",
      updatedUser: updatedUser.rows[0],
    });
  } catch (error) {
    res.status(500).send("Error updating user");
    console.log(error);
  }
};
