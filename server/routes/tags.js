import express from 'express';

import { createTag, deleteTag } from '../controllers/tag.js';

const router = express.Router();

router.post('/createtag', createTag);
router.post('/deletetag', deleteTag);

export default router;
