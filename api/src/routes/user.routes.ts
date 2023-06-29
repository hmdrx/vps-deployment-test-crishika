import express from 'express';
import {
  register,
  login,
  protect,
  verification,
  resendOtp,
  restrictTo,
  appOptRegisterVerification,
  appRegister,
  sendAppOTPRegister,
  appLogin,
} from '../controllers/authController';
import {
  getUser,
  getAllUser,
  deleteAllUser,
  deleteMe,
  updatePassword,
  resetPassword,
  updateMe,
  deleteUser,
  reactiveUser,
  myProfile,
  resetPasswordSendOtp,
  resetPasswordOtpValidation,
  resetAppPassword,
  resetAppPasswordSendOtp,
  resetAppPasswordOtpValidation,
} from '../controllers/userController';
const router = express.Router();

router.route('/register').post(register);
router.route('/app-register').post(appRegister);
router.route('/send-app-otp').post(sendAppOTPRegister);
router.route('/verify-app-otp').post(appOptRegisterVerification);
router.route('/login').post(login);
router.route('/app-login').post(appLogin);
router.route('/verification').post(verification);
router.route('/resend-otp').post(resendOtp);
router.route('/password-reset-app').patch(resetAppPassword);
router.route('/password-reset').patch(resetPassword);
router.route('/password-reset-app-send-otp').post(resetAppPasswordSendOtp);
router.route('/password-reset-send-otp').post(resetPasswordSendOtp);
router
  .route('/password-reset-app-otp-validation')
  .post(resetAppPasswordOtpValidation);
router.route('/password-reset-otp-validation').post(resetPasswordOtpValidation);
router.use(protect);
router.route('/my-profile').get(myProfile);
router.route('/update-account').patch(updateMe);
router.route('/delete-account').patch(deleteMe);
router.route('/password-update').patch(updatePassword);

router.use(restrictTo('admin'));
router.route('/:id').get(getUser).patch(reactiveUser).delete(deleteUser);
router.route('/').get(getAllUser).delete(deleteAllUser);

export default router;
