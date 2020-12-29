import mongoose from 'mongoose';

const postSchema = mongoose.Schema({ 
    message: {type: String, require: true},
    creator: {type: String, require: true},
    tags: [String],
    selectedFile: String,
    likeCount: {
            type: Number,
            default: 0,
        },
        likedBy: [String],
        createdAt: {
            type: Date,
            default: Date.now
        }, 
        comments: [{
            type: String,
            by: String,
            comment: String,
            commentLikeCount: {
                type: Number,
                default: 0
            }
        }]
});


const PostMessage = mongoose.model('postMessage', postSchema);

export default PostMessage;