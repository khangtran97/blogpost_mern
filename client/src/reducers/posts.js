import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
} from '../constants/actionTypes';

const updatePost = (posts, payload) => {
  return posts.map((post) => (post._id === payload._id ? payload : post));
};

const updateHandler = (posts, payload) => {
  // return posts.map((post) => (post._id === payload._id ? payload : post));
  return updatePost(posts, payload);
};

const likeHandler = (posts, payload) => {
  // return posts.map((post) => (post._id === payload._id ? payload : post));
  return updatePost(posts, payload);
};

export default (posts = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL:
      return payload;
    case CREATE:
      return [...posts, payload];
    case UPDATE:
      return updateHandler(posts, payload);
    case LIKE:
      return likeHandler(posts, payload);
    case DELETE:
      return posts.filter((post) => post._id !== payload);
    default:
      return posts;
  }
};
