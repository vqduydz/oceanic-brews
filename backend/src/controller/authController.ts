import { Request, Response } from "express";
import { User } from "../db/models";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  generateImgPath,
  passwordHandling,
  responseData,
  tokenHandling,
} from "../utils";

dotenv.config();

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { password, confirmPassword, ...data } = req.body;
    const passwordHashed = await passwordHandling.hashing(password);
    const user = await User.create({
      ...data,
      password: passwordHashed,
      active: true,
      verified: false,
    });

    const { password: p, ...resData } = user.dataValues;
    return res.status(201).send(
      responseData(201, true, "Registered", null, {
        user: { ...resData },
        imgPath: generateImgPath(req),
      })
    );
  } catch (error: any) {
    return res
      .status(500)
      .send(responseData(500, false, "Bad Request", error, null));
  }
};

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "verified",
        "active",
        "password",
      ],
      where: { email: email },
    });
    if (
      !user ||
      (user && !(await passwordHandling.compare(password, user.password)))
    ) {
      return res
        .status(401)
        .send(
          responseData(401, false, "Email or password is incorrect", null, null)
        );
    }
    const { firstName, lastName, email: e, verified, active } = user.dataValues;
    const dataGenerate = { firstName, lastName, email: e, verified, active };
    const accessToken = tokenHandling.generateToken(dataGenerate);
    const refreshToken = tokenHandling.generateRefreshToken(dataGenerate);
    user.set({ accessToken: refreshToken });
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
      partitioned: true,
      // path: "/",
      // domain:"oceanicbrews.com",
    });

    return res
      .status(200)
      .send(responseData(200, true, "OK", null, { accessToken }));
  } catch (error) {
    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .send(responseData(401, false, "Unauthorized", null, null));
    }

    const decodedUser = tokenHandling.extractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(401)
        .send(responseData(401, false, "Unauthorized", null, null));
    }

    const accessToken = tokenHandling.generateToken({
      firstName: decodedUser.firstName,
      lastName: decodedUser.lastName,
      email: decodedUser.email,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });

    console.log("111--New accessToken : ", accessToken);

    return res
      .status(200)
      .send(responseData(200, true, "OK", null, { accessToken }));
  } catch (error) {
    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

const UserLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(200)
        .send(responseData(200, true, "User logout", null, null));
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .send(responseData(200, true, "User logout", null, null));
    }
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .send(responseData(200, true, "User logout", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(201)
        .send(responseData(404, false, "Email is incorrect", null, null));
    }

    const token = tokenHandling.generateToken({ email }, 300);

    // send email with reset password link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetPasswordLink = `${req.headers.referer}reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Password reset - Đặt lại mật khẩu",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n${resetPasswordLink} \nIf you did not request this, please ignore this email and your password will remain unchanged.\n_______________________________________\n\nBạn nhận được thông báo này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\nVui lòng nhấp vào liên kết sau hoặc dán nó vào trình duyệt của bạn để hoàn tất quy trình:\n${resetPasswordLink} \nNếu bạn đã không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.response)
      return res
        .status(200)
        .send(
          responseData(
            202,
            true,
            `An email has been sent to ${user.email} with further instructions.`,
            null,
            null
          )
        );
    return res
      .status(500)
      .send(responseData(500, false, "Failed to send email", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password, user } = req.body;

    const passwordHashed = await passwordHandling.hashing(password);
    const data = { password: passwordHashed };
    user.update(data);
    await user.save();
    return res
      .status(201)
      .send(responseData(201, true, "Reset Password successfully", null, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(responseData(500, false, "Bad Request", error, null));
  }
};

export default {
  register,
  UserLogin,
  UserLogout,
  refreshToken,
  forgotPassword,
  resetPassword,
};
