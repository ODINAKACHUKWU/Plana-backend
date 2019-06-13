import jwt from 'jsonwebtoken';
import jwtConfigs from '../configs/jwt';

const getJWTConfigs = (options) => {
  const { mode, ...moreOptions } = options;
  const errorMessage = Error('An object with the property mode is required!');
  if (!mode) {
    throw errorMessage;
  }
  return {
    ...jwtConfigs[mode],
    ...moreOptions,
  };
};

const generateToken = (payload, configs) => {
  const { secret, ...options } = configs;
  try {
    return jwt.sign(payload, secret, options);
  } catch (err) {
    throw Error(err);
  }
};

const decodeToken = (token, configs) => {
  const { secret, ...options } = configs;
  jwt.verify(token, secret, options);
};

export { generateToken, decodeToken, getJWTConfigs };
