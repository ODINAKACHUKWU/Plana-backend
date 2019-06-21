import User from '../models/user';
import http from '../helpers/http';
import { generateToken, getJWTConfigs } from '../helpers/jwt';

const { httpResponse, serverError } = http;
const authenticationJWTConfigs = getJWTConfigs({ mode: 'authentication' });
const failureResponses = [
  {
    statusCode: 409,
    success: false,
    message: 'Email has already been used',
  },
  {
    statusCode: 400,
    success: false,
    message: 'Invalid login credentials',
  },
];

export const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.checkUniqueEmail(email);
    const newUserData = { firstName, lastName, email, password };
    if (!user) {
      const userData = await User.create(newUserData);
      const { _id, isAdmin, firstName, lastName, email } = userData;
      const payload = { userId: _id, isAdmin, firstName, lastName };
      const token = await generateToken(payload, authenticationJWTConfigs);
      const fullName = await userData.getUserFullName();
      return httpResponse(res, {
        statusCode: 201,
        success: true,
        message: `Account successfully created for ${fullName}`,
        token,
        data: { _id, firstName, lastName, email },
      });
    }
    return httpResponse(res, failureResponses[0]);
  } catch (error) {
    return serverError(res, error);
  }
};

export const loginInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isUser = await user.checkPasswordMatch(password);
      if (isUser) {
        const fullName = await user.getUserFullName();
        const { _id, isAdmin, firstName, lastName } = user;
        const payload = { userId: _id, isAdmin, firstName, lastName };
        const token = await generateToken(payload, authenticationJWTConfigs);
        return httpResponse(res, {
          statusCode: 200,
          success: true,
          message: `${fullName} is logged in`,
          token,
        });
      }
      return httpResponse(res, failureResponses[1]);
    }
    return httpResponse(res, failureResponses[1]);
  } catch (error) {
    return serverError(res, error);
  }
};
