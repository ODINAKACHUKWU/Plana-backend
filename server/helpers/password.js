import bcrypt from 'bcrypt';

const hashPassword = (password) => {
  const saltRounds = 10;
  const hash = bcrypt.hash(password, saltRounds);
  return hash;
};

const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export { hashPassword, comparePassword };
