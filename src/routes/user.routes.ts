import express from 'express';
import { getMeHandler } from '../controllers/user.controller';

const router = express.Router();

router.get('/me', getMeHandler);

export default router;
