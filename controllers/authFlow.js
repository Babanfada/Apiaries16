const { StatusCodes } = require("http-status-codes");
const { users: USERS, token: TOKEN } = require("../models");
const crypto = require("crypto");
const {
  FORBIDDEN,
  UNAUTHORIZED,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../middlewares/customErrors");
const sendVerificationMail = require("../utils/sendVerificationMail");
const { createUser, attachResponseToCookie } = require("../utils/jwt");
const { token } = require("morgan");
const register = async (req, res) => {
  const {
    fullname,
    email,
    password,
    address,
    phone,
    gender,
    emailNotification,
  } = req.body;
  const isEmailAlreadyExist = await USERS.findOne({ where: { email } });
  if (isEmailAlreadyExist) {
    throw new BAD_REQUEST("This Email has already been registered");
  }

  const isFirstAccount = await USERS.count();
  const role = isFirstAccount === 0 ? "admin" : "user";

  const verificationString = crypto.randomBytes(40).toString("hex");

  const userObject = {
    fullname,
    email,
    password,
    phone,
    gender,
    address,
    role,
    verificationString,
    emailNotification,
  };
  console.log(userObject, "jkk");
  const user = await USERS.create(userObject);
  const origin = "http://localhost:5003";
  // verify Email
  await sendVerificationMail({
    origin,
    email: user.email,
    verificationString: user.verificationString,
    fullname: user.fullname,
  });
  res.status(StatusCodes.CREATED).json({
    Msg: "Please check your mail and complete your registerarion",
    userObject,
  });
};

const verifyMail = async (req, res) => {
  const { verificationString, email } = req.body;
  console.log(req.body);
  const user = await USERS.findOne({ where: { email } });
  console.log(user);
  if (!user) {
    throw new BAD_REQUEST(
      "verification failed!!!, this email is not registered yet"
    );
  }
  if (verificationString !== user.verificationString) {
    throw new BAD_REQUEST("verification failed!!!");
  }

  user.verificationString = null;
  user.isVerified = true;
  user.verified = Date.now();
  user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Congratulations!!!! you are welcome to the colony" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    throw new BAD_REQUEST(
      "You have not provided either an email or a password"
    );
  }
  const user = await USERS.findOne({ where: { email } });
  if (!user) {
    throw new BAD_REQUEST("This email has not been registered yet !!!");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  //   console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new UNAUTHORIZED("invalid credentials");
  }
  const isVerified = user.isVerified;
  //   const isVerified = false;
  if (!isVerified) {
    throw new UNAUTHORIZED(
      "This Email is not verified yet, please verify your email first !!!"
    );
  }
  const isBlackListed = user.blackListed;
  if (isBlackListed) {
    throw new UNAUTHORIZED(
      "You have been BANNED from accessing this Route sorry !!!!!"
    );
  }
  const tokenUser = createUser(user);
  //   create a refresh token
  let refreshToken = "";

  //   if user session is still valid
  const isTokenStillVaild = await TOKEN.findOne({
    where: { user: user.user_id },
  });
  if (isTokenStillVaild) {
    const isValid = isTokenStillVaild.isValid;
    if (!isValid) {
      throw new UNAUTHORIZED("Token is not valid");
    }
    refreshToken = isTokenStillVaild.refreshToken;
    attachResponseToCookie({ res, refreshToken, tokenUser });
    res.status(StatusCodes.OK).json({ msg: "Login Sucessful !!!!" });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  await TOKEN.create({ refreshToken, userAgent, ip, user: user.user_id });
  attachResponseToCookie({ res, refreshToken, tokenUser });
  res.status(StatusCodes.OK).json({ msg: "Login Sucessful !!!!" });
};
const showMe = async (req, res) => {
  console.log(req.user);
  const { user_id, fullname, email, role, address, gender, emailNotification } =
    req.user;
  res.status(StatusCodes.OK).json({
    user_id,
    fullname,
    email,
    role,
    address,
    gender,
    emailNotification,
  });
};
const logout = async (req, res) => {
  // console.log(req.user);
  await TOKEN.destroy({ where: { user: req.user.user_id } });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: "None",
    secure: true,
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: "None",
    secure: true,
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
const checkUserRegisterationStatus = async (req, res) => {
  const { email } = req.body;
  const user = await USERS.findOne({ where: { email } });
  if (!user) {
    res.status(StatusCodes.OK).json({ msg: "notfound" });
  }
  res.status(StatusCodes.OK).json({ msg: "found" });
};
module.exports = {
  register,
  verifyMail,
  login,
  showMe,
  logout,
  checkUserRegisterationStatus,
};
