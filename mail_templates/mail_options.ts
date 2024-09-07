import 'dotenv/config';

export const OnboardingOptions = (email, id, token) => {
  return {
    from: `"Trade Binder" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Account Confirmation',
    template: 'onboarding_email',
    context: { id, token },
  };
};
