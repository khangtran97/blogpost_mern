import mongoose from 'mongoose';
import Tag from '../models/tag.js';

export const createTag = (req, res) => {
  const { tags, _id } = req.newPost;

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
          .then((result) => res.json(result))
          .catch((error) => console.log(error));
      } else {
        const result = await Tag.create({
          name: tag,
          posts: _id,
        });

        res.json(result);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
export const deleteTag = async (req, res) => {};
