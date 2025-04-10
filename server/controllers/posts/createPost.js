import { pool } from "../../db.js";
import multer from "multer";
import streamifier from "streamifier";
import cloudinaryConfig from "../../utils/cloudinaryConfig.js";

const memoryStorage = multer.memoryStorage();
export const upload = multer({ storage: memoryStorage });

export const createPost = async (req, res) => {
  try {
    const userIdDetails = req.userId;
    const userId = userIdDetails.id.user;

    const { foldername, caption, location } = req.body;

    let mediaUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinaryConfig.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: foldername,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      mediaUrl = result.secure_url;
    }

    const query = `INSERT INTO posts  (post_id,content_url,description,location,user_id)
      VALUES(gen_random_uuid(),$1,$2,$3,$4);
    `;

    const { rows } = await pool.query(query, [
      mediaUrl,
      caption,
      location,
      userId,
    ]);

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default { createPost, upload };
