import Blog from "../models/Blog.js";

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(400).json({ message: "No blogs found." });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export { getAllBlogs };
