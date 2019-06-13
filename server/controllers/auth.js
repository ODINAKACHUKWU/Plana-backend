import User from '../models/user';
import http from '../helpers/http';
import { generateToken, getJWTConfigs } from '../helpers/jwt';

const { httpResponse, serverError } = http;
const authenticationJWTConfigs = getJWTConfigs({ mode: 'authentication' });

const signupUser = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  try {
    const user = await User.checkUniqueEmail(email);
    const newUserData = {
      firstName,
      lastName,
      email,
      password,
    };
    if (!user) {
      const userData = await User.create(newUserData);
      const {
        _id,
        isAdmin,
        firstName,
        lastName,
        email,
      } = userData;
      const token = generateToken(
        {
          userId: _id,
          isAdmin,
          firstName,
          lastName,
        },
        authenticationJWTConfigs,
      );
      const fullName = userData.getUserFullName();
      return httpResponse(res, {
        statusCode: 201,
        success: true,
        message: `Account successfully created for ${fullName}`,
        token,
        data: {
          _id,
          firstName,
          lastName,
          email,
        },
      });
    }
    return httpResponse(res, {
      statusCode: 409,
      success: false,
      message: 'Email has already been used',
    });
  } catch (error) {
    return serverError(res, error);
  }
};

export default signupUser;
