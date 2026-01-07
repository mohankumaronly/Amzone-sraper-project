const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require("../models/auth.model");
const RefreshToken = require("../models/auth.refreshToken");
const sendEmail = require('../utils/sendEmail');
const verifyEmailTemplate = require("../utils/Emails/emailVerificationTemplate");

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashPassword,
        });
        const verifyToken = crypto.randomBytes(32).toString("hex");
        const hashedVerifyToken = crypto
            .createHash("sha256")
            .update(verifyToken)
            .digest("hex");
        user.emailVerificationToken = hashedVerifyToken;
        user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verifyToken}`;
        await sendEmail({
            to: user.email,
            subject: "Verify your email",
            html: verifyEmailTemplate(verifyUrl),
            text: `Verify your email using this link: ${verifyUrl}`,
        });
        const { password: _, ...saveUserData } = user.toObject();
        return res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email.",
            data: saveUserData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password, rememberMe = false } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in",
            });
        }

        const accessTokenExpiry = rememberMe ? "7d" : "15m";
        const accessTokenMaxAge = rememberMe
            ? 7 * 24 * 60 * 60 * 1000
            : 15 * 60 * 1000;

        const refreshTokenExpiry = rememberMe
            ? 30 * 24 * 60 * 60 * 1000
            : 7 * 24 * 60 * 60 * 1000;


        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: accessTokenExpiry }
        );

        const newRefreshToken = crypto.randomBytes(40).toString("hex");
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex");

        await RefreshToken.create({
            userId: user._id,
            token: hashedRefreshToken,
            expiresAt: Date.now() + refreshTokenExpiry,
        });

        const { password: _, ...safeUserData } = user.toObject();

        return res
            .cookie("accessToken", accessToken, {
                ...cookieOptions,
                maxAge: accessTokenMaxAge,
            })
            .cookie("refreshToken", newRefreshToken, {
                ...cookieOptions,
                maxAge: refreshTokenExpiry,
            })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
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


const logOut = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const hashedToken = crypto
                .createHash("sha256")
                .update(refreshToken)
                .digest("hex");

            await RefreshToken.findOneAndUpdate(
                { token: hashedToken },
                { revoked: true }
            );
        }

        return res
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "User logged out successfully",
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error",
        });
    }
}



module.exports = {
    register,
    login,
    logOut
}