import express from 'express';
import { protect } from '../../controllers/authController';
const router = express.Router();

// module imports
import {
  createReadAttempt,
  deleteAllReadAttempt,
  getAllReadAttempt,
  getIncorrectOrSkippedQuestionAttempt,
} from '../../controllers/attempt/readAttemptController';

router.use(protect);
router
  .route('/')
  .post(createReadAttempt)
  .get(getAllReadAttempt)
  .delete(deleteAllReadAttempt);
router.route('/wrong-attempt').get(getIncorrectOrSkippedQuestionAttempt);

export default router;
