import dotenv from 'dotenv';

dotenv.config();

const {
  JWT_ISSUER,
  JWT_AUTH_SUBJECT,
  JWT_AUTH_SECRET,
  JWT_AUTH_EXPIRY_TIME,
  JWT_VERIFICATION_SUBJECT,
  JWT_VERIFICATION_SECRET,
  JWT_VERIFICATION_EXPIRY_TIME,
} = process.env;

const jwtConfigs = {
  authenication: {
    issuer: JWT_ISSUER,
    subject: JWT_AUTH_SUBJECT,
    secret: JWT_AUTH_SECRET,
    expiresIn: JWT_AUTH_EXPIRY_TIME,
  },

  verification: {
    issuer: JWT_ISSUER,
    subject: JWT_VERIFICATION_SUBJECT,
    secret: JWT_VERIFICATION_SECRET,
    expiresIn: JWT_VERIFICATION_EXPIRY_TIME,
  },
};

export default jwtConfigs;
