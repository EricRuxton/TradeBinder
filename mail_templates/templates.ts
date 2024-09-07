import 'dotenv/config';

export const OnboardingTemplate = (email) => {
  return {
    from: `"Trade Binder" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Account Confirmation', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  };
};
