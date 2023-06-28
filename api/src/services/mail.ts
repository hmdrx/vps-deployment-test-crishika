import nodemailer from 'nodemailer';

interface IMailParams {
  to: string;
  subject: string;
  otp: string;
  template: (otp: string) => string;
}

const emailSettings = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(emailSettings);

const sendMail = async (params: IMailParams) => {
  try {
    let info = await transporter.sendMail({
      from: `'Crishika' ${emailSettings.auth.user}`,
      to: params.to,
      subject: params.subject,
      // html: tempOtpVerification({ otp: params.otp }),
      html: params.template(params.otp),
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendMail;
