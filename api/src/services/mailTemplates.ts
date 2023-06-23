export const tempOtpVerification = (otp: number) => {
  return `
    <div
    class="container"
    style="max-width: 90%; margin: auto; padding-top: 20px"
  >
    <h3>Welcome to the Crishika</h3>
    <h4>OTP Verification</h4>
    <p style="margin-bottom: 30px;">Pleas enter the below verificaion code to get started</p>
    <h4 style="font-size: 28px; letter-spacing: 2px; text-align:center;">${otp}</41>
</div>
    `;
};
export const tempResetPasswordOtp = (otp: number) => {
  return `
    <div
    class="container"
    style="max-width: 90%; margin: auto; padding-top: 20px"
  >
    <h3>Welcome to the Crishika</h3>
    <h4>Reset Password OTP Verification</h4>
    <p style="margin-bottom: 30px;">Pleas enter the below verificaion code to reset your password</p>
    <h4 style="font-size: 28px; letter-spacing: 2px; text-align:center;">${otp}</41>
</div>
    
    `;
};
