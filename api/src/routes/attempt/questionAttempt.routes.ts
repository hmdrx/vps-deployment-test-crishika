import express from 'express';
import {
  createQuestionAttempt,
  deleteAllQuestionAttempt,
  getAllQuestionAttempt,
  getIncorrectQuestionAttempt,
} from '../../controllers/attempt/questionAttemptController';
import { protect } from '../../controllers/authController';
const router = express.Router();

router.use(protect);
router
  .route('/')
  .post(createQuestionAttempt)
  .get(getAllQuestionAttempt)
  .delete(deleteAllQuestionAttempt);
router.route('/again').get(getIncorrectQuestionAttempt);

export default router;
