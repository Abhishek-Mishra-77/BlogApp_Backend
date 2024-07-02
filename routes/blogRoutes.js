import express from "express";

const router = express.Router();
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlog,
  removeBlog,
} from "../controllers/blogControllers.js";

router.get("/", getAllBlogs);
router.post("/addBlog", addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getBlog);
router.delete("/remove/:id", removeBlog);

export default router;
