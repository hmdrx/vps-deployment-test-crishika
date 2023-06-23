import express from 'express';
const router = express.Router();

// module imports
import {
  createSubject,
  getSubject,
  getAllSubject,
  updateSubject,
  deleteSubject,
  deleteAllSubject,
} from '../controllers/subjectController';

router
  .route('/')
  .get(getAllSubject)
  .post(createSubject)
  .delete(deleteAllSubject);

router.route('/:id').get(getSubject).patch(updateSubject).delete(deleteSubject);

export default router;
