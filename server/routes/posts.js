import express from 'express';
import { getPosts, createPost, deletePost, likePost, unLikePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.patch('/:id/unLikePost', unLikePost);
//router.patch('/:id/comments', commentPost);

export default router;

