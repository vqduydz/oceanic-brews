import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../db/models";
import {
  passwordHandling,
  responseData,
  generateImgPath,
  tokenHandling,
} from "../utils";

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

    return res.status(201).send(
      responseData(201, "Registered", null, {
        user,
        imgPath: generateImgPath(req),
      })
    );
  } catch (error: any) {
    return res.status(500).send(responseData(500, "Bad Request", error, null));
  }
};

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send(responseData(401, "Unauthorized", null, null));
    }

    const matched = await passwordHandling.compare(password, user.password);
    if (!matched) {
      return res
        .status(401)
        .send(responseData(401, "Unauthorized", null, null));
    }

    const { password: p, ...dataUser } = user;
    const token = tokenHandling.generateToken(dataUser);
    const refreshToken = tokenHandling.generateRefreshToken(dataUser);
    user.accessToken = refreshToken;

    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { accessToken, ...data } = dataUser;

    const responseUser = { ...data, token: token };
    return res.status(200).send(responseData(200, "OK", null, responseUser));
  } catch (error) {
    return res.status(500).send(responseData(500, "", error, null));
  }
};

// const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
// 	try {
// 		const refreshToken = req.cookies?.refreshToken;

// 		if (!refreshToken) {
// 			return res.status(401).send(responseData(401, "Unauthorized", null, null));
// 		}

// 		const decodedUser = Helper.ExtractRefreshToken(refreshToken);
// 		console.log(decodedUser);
// 		if (!decodedUser) {
// 			return res.status(401).send(responseData(401, "Unauthorized", null, null));
// 		}

// 		const token = Helper.GenerateToken({
// 			name: decodedUser.name,
// 			email: decodedUser.email,
// 			roleId: decodedUser.roleId,
// 			verified: decodedUser.verified,
// 			active: decodedUser.active
// 		});

// 		const resultUser = {
// 			name: decodedUser.name,
// 			email: decodedUser.email,
// 			roleId: decodedUser.roleId,
// 			verified: decodedUser.verified,
// 			active: decodedUser.active,
// 			token: token
// 		}

// 		return res.status(200).send(responseData(200, "OK", null, resultUser));

// 	} catch (error) {
// 		return res.status(500).send(responseData(500, "", error, null));
// 	}
// };

// const UserDetail = async (req: Request, res: Response): Promise<Response> => {
// 	try {
// 		const email = res.locals.userEmail;
// 		const user = await User.findOne({
// 			where: {
// 				email: email
// 			},
// 			include: {
// 				model: Role,
// 				attributes: ["id", "roleName"]
// 			}
// 		});

// 		if (!user) {
// 			return res.status(404).send(responseData(404, "User not found", null, null));
// 		}

// 		user.password = "";
// 		user.accessToken = "";
// 		return res.status(200).send(responseData(200, "OK", null, user));
// 	} catch (error) {
// 		return res.status(500).send(responseData(500, "", error, null));
// 	}
// };

// const UserLogout = async (req: Request, res: Response): Promise<Response> => {
// 	try {
// 		const refreshToken = req.cookies?.refreshToken;
// 		if (!refreshToken) {
// 			return res.status(200).send(responseData(200, "User logout", null, null));
// 		}
// 		const email = res.locals.userEmail;
// 		const user = await User.findOne({
// 			where: {
// 				email: email
// 			}
// 		});

// 		if (!user) {
// 			res.clearCookie("refreshToken");
// 			return res.status(200).send(responseData(200, "User logout", null, null));
// 		}

// 		await user.update({ accessToken: null }, { where: { email: email } });
// 		res.clearCookie("refreshToken");
// 		return res.status(200).send(responseData(200, "User logout", null, null));
// 	} catch (error) {
// 		return res.status(500).send(responseData(500, "", error, null));
// 	}
// }

export default {
  register,
  UserLogin,
};
