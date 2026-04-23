const postService = require("../services/post.service");

exports.create = async (req, res, next) => {
  try {
    const post = await postService.createPost({
      ...req.body,
      author: req.user.userId
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
  try {
    const posts = await postService.getPostsByAuthor(req.user.userId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const post = await postService.updatePost(
      req.params.id,
      req.user,
      req.body
    );
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id, req.user);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};