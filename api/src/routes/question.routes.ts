import express from 'express';
import { protect } from '../controllers/authController';
import {
  getQuestion,
  getAllQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestion,
  getPracticeQuestion,
  getReadQuestion,
} from '../controllers/questionController';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllQuestion)
  .post(createQuestion)
  .delete(deleteAllQuestion);

router.route('/practice').post(protect, getPracticeQuestion);
router.route('/read').post(protect, getReadQuestion);
router
  .route('/:id')
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default router;
