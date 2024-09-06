import * as bcrypt from 'bcrypt';

export const generatePassword = async (pwd: string) => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(pwd, salt);
  return {
    hash: hashed,
    salt: salt,
  };
};

export const hashPassword = async (pwd: string, salt: string) => {
  return await bcrypt.hash(pwd, salt);
};

export const validatePassword = async (
  pwd: string,
  salt: string,
  hash: string,
) => {
  const hashedPwd = await hashPassword(pwd, salt);

  if (hashedPwd == hash) {
    return true;
  }

  return false;
};
