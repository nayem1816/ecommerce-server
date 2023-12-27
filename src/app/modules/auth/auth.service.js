const ApiError = require("../../../errors/apiError");
const User = require("../users/user.model");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../../../helpers/jwtHelpers");
const config = require("../../../config/config");

const loginService = async (payload) => {
  const { email, password } = payload;

  const isExistUser = await User.findOne({
    email,
  });

  if (!isExistUser) {
    throw new ApiError(400, "User does not exist");
  }

  const { _id } = isExistUser;

  const isMatchPassword = await bcrypt.compare(password, isExistUser.password);

  if (!isMatchPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    user: isExistUser,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token) => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { _id } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.findById(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    accessToken: newAccessToken,
  };
};

module.exports = {
  loginService,
  refreshToken,
};
