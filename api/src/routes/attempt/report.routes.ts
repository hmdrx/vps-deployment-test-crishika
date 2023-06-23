import express from 'express';
const router = express.Router();
import {
  getAllReportAtOnce,
  getLastSevenDaysQuestionAttemptProgress,
  getLastSevenDaysReadAttemptProgress,
  getQuestionAttemptReport,
  getQuestionAttemptReportAndProgress,
  getReadAttemptReport,
  getReadReportAndProgress,
} from '../../controllers/attempt/reportController';
import { protect } from '../../controllers/authController';

router.use(protect);

//QUESTION
router.route('/question').get(getQuestionAttemptReport);
router
  .route('/question/last-seven-days')
  .get(getLastSevenDaysQuestionAttemptProgress);

//READ
router.route('/read').get(getReadAttemptReport);
router.route('/read/last-seven-days').get(getLastSevenDaysReadAttemptProgress);

// COMBINE
router.get('/read-report-progress', getReadReportAndProgress);
router.get('/question-report-progress', getQuestionAttemptReportAndProgress);
router.get('/all-report-progress', getAllReportAtOnce);

export default router;
