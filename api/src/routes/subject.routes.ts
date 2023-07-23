import express from 'express';
import { protect, restrictTo } from '../controllers/authController';
const router = express.Router();

// module imports
import {
  createSubject,
  getSubject,
  getAllSubject,
  updateSubject,
  deleteSubject,
  deleteAllSubject,
  getAvailableSubject,
} from '../controllers/subjectController';

router.route('/available').get(getAvailableSubject);

router.use(protect, restrictTo('admin'));
router
  .route('/')
  .get(getAllSubject)
  .post(createSubject)
  .delete(deleteAllSubject);

router.route('/:id').get(getSubject).patch(updateSubject).delete(deleteSubject);

export default router;
