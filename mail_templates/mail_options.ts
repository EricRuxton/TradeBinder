import 'dotenv/config';

export const OnboardingOptions = (email) => {
  return {
    from: `"Trade Binder" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Account Confirmation', // Subject line
    template: '',
    context: {},
  };
};
