import express from 'express';
import { getUser, getUsers, insertUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', insertUser);

export default router;

