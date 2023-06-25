import { Container, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../constants/colors';
import Background from './Background';

const termsAndConditions = [
  'The "Crishika" app is an online platform designed for agricultural students in India who want to prepare for competitive or entrance exams like CET JRF RAEO RHEO and other agricultural exams.',
  'By using the app, you agree to comply with all the terms and conditions outlined in this document.',
  'All content provided on the app is for educational purposes only, and should not be construed as professional advice or guidance.',
  'We reserve the right to modify, suspend or terminate the app or any part of it, at any time and without notice.',
  'We reserve the right to deny access to any user who violates any of the terms and conditions.',
  'We reserve the right to collect, use and store the information you provide during registration, including your name, mobile number, email, college name, degree and degree status like pursuing or passout, for the purpose of improving the app and providing you with a better experience.',
  'By using the app, you agree that we may use your information to send you updates, news and promotional offers related to "Crishika".',
  'You agree to use the app only for lawful purposes and not to engage in any conduct that violates any applicable laws or regulations.',
  "You agree not to use any part of the app to transmit any viruses or malicious code or engage in any activities that could damage, disable or impair the app or any other user's access to it.",
  'You agree not to reproduce, duplicate, copy, sell, resell or exploit any part of the app for any commercial purposes without our prior written consent.',
];

const privacyPolicy = [
  'By using this app, you agree to the following terms and conditions:',
  'You must be a student of agriculture or related fields to use this app.',
  'You may only use this app for educational purposes.',
  'You must not use this app to cheat or engage in any form of academic misconduct.',
  'You are responsible for any information or content that you upload or submit through this app.',
  'We reserve the right to terminate your access to this app at any time, without notice or liability.',
  'We may update or change these terms and conditions at any time, without notice or liability.',
  'By continuing to use this app, you agree to be bound by the latest version of these terms and conditions.',
  'If you do not agree to these terms and conditions, please do not use this app.',
];

const PrivacyPolicy = () => {
  return (
    <>
      <Background />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h5">
          Privacy Policy
        </Typography>
        {privacyPolicy.map(el => (
          <>
            <Typography
              sx={{ textAlign: 'justify' }}
              color={colors.dark}
              variant="body2"
            >
              {el}
            </Typography>
            <br />
          </>
        ))}

        <Typography sx={{ my: 2 }} variant="h5">
          Terms & Conditions
        </Typography>
        {termsAndConditions.map(el => (
          <>
            <Typography
              sx={{ textAlign: 'justify' }}
              color={colors.dark}
              variant="body2"
            >
              {el}
            </Typography>
            <br />
          </>
        ))}
      </Container>
    </>
  );
};

export default PrivacyPolicy;
