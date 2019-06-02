import User from '../models/user';

export const getUsers = async (req, res) => {
  const user = await User.find();
  return res.status(200).json({
    success: true,
    message: 'Users retrieved',
    data: user,
  });
};

export const addUser = (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const user = new User({
    firstName, lastName, email, password,
  });
  user.save((err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: 'User created',
      data,
    });
  });
};
