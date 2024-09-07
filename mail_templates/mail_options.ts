import 'dotenv/config';

export const OnboardingOptions = (email, token) => {
  return {
    from: `"Trade Binder" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Account Confirmation', // Subject line
    template: 'onboarding_email',
    context: { token },
  };
};
