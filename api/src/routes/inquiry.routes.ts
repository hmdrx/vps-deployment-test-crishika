import express from 'express';
import { createInquiry } from '../controllers/inquiryController';
const router = express.Router();

router.route('/guest').post(createInquiry);

export default router;
