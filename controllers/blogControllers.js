import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

const getAllBlogs = async (req, res) => {
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

const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  try {
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable to find user by this Id." });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await session.commitTransaction();
    await existingUser.save({ session });
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });

    blog.save();
    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });

    if (!blog) {
      return res.status(500).json({ message: "unable to update the blog." });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const getBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "No blog found." });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
const removeBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ message: "No blog found." });
    }

    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export { getAllBlogs, addBlog, updateBlog, getBlog, removeBlog };
