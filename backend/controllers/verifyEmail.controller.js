const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/auth.refreshToken");
const User = require("../models/auth.model");

const verifyEmail = async (req, res) => {
  try {

    const rawToken = decodeURIComponent(req.params.token)
      .split("?")[0]
      .trim();

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Verification link invalid or expired",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();


    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = crypto.randomBytes(40).toString("hex");
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000;

    await RefreshToken.create({
      userId: user._id,
      token: hashedRefreshToken,
      expiresAt: Date.now() + refreshTokenExpiry,
    });

    const { password, ...safeUserData } = user.toObject();

    return res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: refreshTokenExpiry,
      })
      .status(200)
      .json({
        success: true,
        message: "Email verified and user logged in",
        data: safeUserData,
      });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server internal error",
    });
  }
};

module.exports = verifyEmail;
