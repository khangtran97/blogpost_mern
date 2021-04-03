import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
    name: String,
    posts: [String]
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
