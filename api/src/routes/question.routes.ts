import express from 'express';
import { protect, restrictTo } from '../controllers/authController';
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

router.use(protect);
router.route('/practice').post(getPracticeQuestion);
router.route('/read').post(getReadQuestion);

router.use(restrictTo('admin'));
router
  .route('/')
  .get(getAllQuestion)
  .post(createQuestion)
  .delete(deleteAllQuestion);
router
  .route('/:id')
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default router;
