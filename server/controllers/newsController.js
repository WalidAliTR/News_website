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
  try {
    const { news_category, author_PK, news_title, news_content } = req.body;

    let news_picture = req.body.news_picture;
    if (!news_category || !author_PK || !news_title || !news_content)
      return res.status(400).json({ msg: "Please fill all the fields" });

    const client = await pool.connect();
    // upload image to cloudinary
    if (news_picture) {
      const uploadedResponse = await cloudinary.uploader.upload(news_picture);
      news_picture = uploadedResponse.secure_url;
      const result = await client.query(
        'UPDATE "news_details" SET news_category = $1, author_PK = $2, news_title = $3, news_content = $4, news_picture = $5 WHERE news_id = $6',
        [
          news_category,
          author_PK,
          news_title,
          news_content,
          news_picture,
          req.params.id,
        ]
      );
    } else {
      const result = await client.query(
        'UPDATE "news_details" SET news_category = $1, author_PK = $2, news_title = $3, news_content = $4 WHERE news_id = $5',
        [news_category, author_PK, news_title, news_content, req.params.id]
      );
    }

    client.release();

    res.status(201).json({ msg: "News updated successfully" });
  } catch (error) {
    res.status(500).json(error);
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
