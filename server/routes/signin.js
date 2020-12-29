import express from 'express';
import { currentUser } from '../controllers/users.js';

const router = express.Router();

router.post('/', currentUser);

export default router;
