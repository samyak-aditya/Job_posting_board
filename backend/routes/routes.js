import express from 'express';
import { signup,login } from '../Controllers/auth.js';
;
import { verifyEmailOtp,verifyMobileOtp } from '../Controllers/verifyOtp.js';

import { inviteCandidate } from '../Controllers/sendInvite.js';
import authmiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);


router.post('/verify-email-otp', verifyEmailOtp);


router.post('/verify-mobile-otp', verifyMobileOtp);

router.post('/create-invite',authmiddleware,inviteCandidate);


export default router;
