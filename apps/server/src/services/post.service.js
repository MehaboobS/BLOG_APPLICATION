const Post = require("../models/post.model");

exports.createPost = async (data) => {
  return await Post.create(data);
};

exports.getAllPosts = async () => {
  return await Post.find().populate("author", "name email");
};

exports.getPostsByAuthor = async (authorId) => {
  return await Post.find({ author: authorId }).populate("author", "name email");
};

exports.getPostById = async (id) => {
  return await Post.findById(id);
};

exports.updatePost = async (id, user, data) => {
  const post = await Post.findById(id);

  if (!post) throw new Error("Post not found");

  if (
    post.author.toString() !== user.userId &&
    user.role !== "admin"
  ) {
    throw new Error("Not authorized");
  }

  return await Post.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePost = async (id, user) => {
  const post = await Post.findById(id);

  if (!post) throw new Error("Post not found");

  if (
    post.author.toString() !== user.userId &&
    user.role !== "admin"
  ) {
    throw new Error("Not authorized");
  }

  await post.deleteOne();
};