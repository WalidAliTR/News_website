import { pool } from "../db/db.js";
import { v2 as cloudinary } from "cloudinary";

// get all news
export const getNews = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM \"news_details_view\" where approve_state = 'true'"
    );
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get news by id
export const getNewsById = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM "news_details_view" WHERE "news_PK" = $1',
      [req.params.id]
    );
    client.release();

    if (result.rows.length === 0)
      return res.status(404).json({ msg: "News not found" });

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

// create news
export const createNews = async (req, res) => {
  try {
    const { news_category, author_PK, news_title, news_content } = req.body;

    let news_picture = req.body.news_picture;
    if (!news_category || !author_PK || !news_title || !news_content) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    const client = await pool.connect();

    try {
      let queryParams;
      let query;

      if (news_picture) {
        const uploadedResponse = await cloudinary.uploader.upload(news_picture);
        news_picture = uploadedResponse.secure_url;

        query =
          'INSERT INTO "news_details" (news_category, "author_PK", news_title, news_content, news_picture) VALUES ($1, $2, $3, $4, $5)';
        queryParams = [
          news_category,
          author_PK,
          news_title,
          news_content,
          news_picture,
        ];
      } else {
        query =
          'INSERT INTO "news_details" (news_category, "author_PK", news_title, news_content) VALUES ($1, $2, $3, $4)';
        queryParams = [news_category, author_PK, news_title, news_content];
      }

      const result = await client.query(query, queryParams);

      res
        .status(201)
        .json({ msg: "News created successfully", result: result.rows });
    } finally {
      // Always release the client, even if an error occurred
      client.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update news
export const updateNews = async (req, res) => {
  const { id } = req.params;
  let { news_category, news_title, news_content, news_picture } = req.body;
  try {
    if (!news_category && !news_title && !news_content && !news_picture)
      return res.status(400).json({ msg: "Please fill one of the fields" });

    const selectedNews = await pool.query(
      'SELECT * FROM "news_details" WHERE "news_PK" = $1',
      [id]
    );

    if (selectedNews.rows.length === 0)
      return res.status(404).json({ msg: "News not found" });

    if (news_category === "")
      news_category = selectedNews.rows[0].news_category;
    if (news_title === "") news_title = selectedNews.rows[0].news_title;
    if (news_content === "") news_content = selectedNews.rows[0].news_content;

    let query = "";
    let queryParams = [];

    if (news_picture === null) {
      news_picture = selectedNews.rows[0].news_picture;
      query =
        'UPDATE "news_details" SET news_category = $1, news_title = $2, news_content = $3, news_picture = $4 , approve_state=$5 WHERE "news_PK" = $6';
      queryParams = [
        news_category,
        news_title,
        news_content,
        news_picture,
        false,
        id,
      ];
    } else {
      // delete old image from cloudinary if exists
      const oldImage = selectedNews.rows[0].news_picture;
      if (oldImage) {
        const public_id = oldImage.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(public_id);
      }
      // upload new image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(news_picture);
      news_picture = uploadedResponse.secure_url;

      query =
        'UPDATE "news_details" SET news_category = $1, news_title = $2, news_content = $3, news_picture = $4 , approve_state=$5 WHERE "news_PK" = $6';
      queryParams = [
        news_category,
        news_title,
        news_content,
        news_picture,
        false,
        id,
      ];
    }

    const updatedNews = await pool.query(query, queryParams);

    res.status(200).json({ msg: "News updated successfully" });
  } catch (error) {
    res.status(500).json("error updating news");
  }
};

// delete news
export const deleteNews = async (req, res) => {
  try {
    const client = await pool.connect();

    // check if news exists
    const news = await client.query(
      'SELECT * FROM "news_details" WHERE "news_PK" = $1',
      [req.params.id]
    );

    if (news.rows.length === 0)
      return res.status(404).json({ msg: "News not found" });

    // delete image from cloudinary
    const news_picture = news.rows[0].news_picture;
    if (news_picture) {
      const public_id = news_picture.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(public_id);
    }

    const result = await client.query(
      'DELETE FROM "news_details" WHERE "news_PK" = $1',
      [req.params.id]
    );
    client.release();
    res.status(200).json({ msg: "News deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
