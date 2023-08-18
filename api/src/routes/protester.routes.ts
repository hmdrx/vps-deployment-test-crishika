import express from 'express';
import {
  createProtester,
  deleteProtester,
  getAllProtester,
  updateProtester,
} from '../controllers/protesterController';
const router = express.Router();

router.route('/').post(createProtester);
router.route('/').patch(updateProtester);
router.route('/').delete(deleteProtester);
router.route('/').get(getAllProtester);

export default router;
