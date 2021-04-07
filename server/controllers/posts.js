import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import Tag from '../models/tag.js';
// import { createTag } from '../controllers/tag.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTag = (newPost) => {
  const { tags, _id } = newPost;

  tags.forEach(async (tag, index) => {
    try {
      const newPostId = _id;
      const isTagExist = await Tag.findOne({ name: tag });

      if (isTagExist) {
        const { posts, _id: existedTagId } = isTagExist;

        const newTag = {
          ...isTagExist._doc,
          posts: [...posts, newPostId.toString()],
        };
        await Tag.findByIdAndUpdate(existedTagId, newTag, {
          new: true,
        })
          .then((result) => console.log('result', result))
          .catch((error) => console.log('error', error));
      } else {
        const result = await Tag.create({
          name: tag,
          posts: _id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    createTag(newPostMessage);

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  console.log(post);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ${id}`);

  const newpost = { ...post, id };
  const updatedPost = await PostMessage.findByIdAndUpdate(id, newpost, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated!' });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
