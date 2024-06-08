import { Request, Response } from "express";
import { User } from "../db/models";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  imgHelper,
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
      verified: false,
      favorites: JSON.stringify([]),
    });

    const { password: p, ...resData } = user.dataValues;
    return res.status(201).send(
      responseData(201, true, "Registered", null, {
        user: { ...resData },
        imgPath: imgHelper.generateAvatar(req),
      })
    );
  } catch (error: any) {
    return res
      .status(500)
      .send(responseData(500, false, "Bad Request", error, null));
  }
};

const userLogin = async (req: Request, res: Response): Promise<Response> => {
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
        "role",
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

    const { email: e, verified, active, role } = user.dataValues;
    const dataGenerate = { email: e, verified, active, role };

    const accessToken = tokenHandling.generateToken(dataGenerate, "300s");
    const refreshToken = tokenHandling.generateRefreshToken(dataGenerate);

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
      res.clearCookie("refreshToken");
      return res
        .status(401)
        .send(responseData(401, false, "Unauthorized", null, null));
    }

    const decodedUser = tokenHandling.extractRefreshToken(refreshToken);
    if (!decodedUser) {
      res.clearCookie("refreshToken");
      return res
        .status(401)
        .send(responseData(401, false, "Unauthorized", null, null));
    }

    const accessToken = tokenHandling.generateToken(
      {
        email: decodedUser.email,
        verified: decodedUser.verified,
        active: decodedUser.active,
        role: decodedUser.role,
      },
      "300s"
    );

    return res
      .status(200)
      .send(responseData(200, true, "OK", null, { accessToken }));
  } catch (error) {
    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

const userLogout = async (req: Request, res: Response): Promise<Response> => {
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
      html: `
      <div>You are receiving this because you (or someone else) have requested the reset of the password for your account.</div>
      <div>To complete the process, please click <a href=${resetPasswordLink}>Reset password</a></div>
      <div>The link is valid for 5 minutes.</div>
      <div>If you did not request this, please ignore this email and your password will remain unchanged.</div>
      <hr/>
      <div>Bạn nhận được thông báo này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</div>
      <div>Để hoàn tất quy trình, vui lòng chọn <a href=${resetPasswordLink}>đặt lại mật khẩu</a></div>
      <div>Liên kết có hiệu lực trong 5 phút.</div>
      <div>Nếu bạn đã không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.</div>
      `,
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

const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      raw: true,
      where: {
        email: email,
      },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.clearCookie("refreshToken");
      return res
        .status(404)
        .send(responseData(404, false, "User does not exist", null, null));
    }
    return res.status(200).send(
      responseData(200, true, "ok", null, {
        user,
        imgPath: imgHelper.generateAvatar(req),
      })
    );
  } catch (error) {
    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

const selfUpdateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const updateDate = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    await user.set(updateDate);
    await user.save();
    return res.status(200).send(
      responseData(200, true, "Update successful", null, {
        user,
        imgPath: imgHelper.generateAvatar(req),
      })
    );
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(responseData(500, false, error.message, error, null));
    }
    return res
      .status(500)
      .send(responseData(500, false, "Internal server error", error, null));
  }
};

export default {
  register,
  userLogin,
  userLogout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  selfUpdateUser,
};
