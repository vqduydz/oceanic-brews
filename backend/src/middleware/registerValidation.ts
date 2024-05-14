import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { User } from "../db/models";
import { responseData } from "../utils";

const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      phoneNumber,
    } = req.body;

    const data = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender: gender || "Other",
      phoneNumber,
    };

    const rules: Validator.Rules = {
      email: "required|email",
      password: "required|min:6",
      confirmPassword: "required|same:password",
      firstName: "required|string|max:50",
      lastName: "required|string|max:50",
      gender: "required|string",
      phoneNumber: "required",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(responseData(400, false, "Bad Request", validate.errors, null));
    }

    const user = await User.findOne({
      where: { email: data.email },
    });
    if (user) {
      return res
        .status(400)
        .send(responseData(400, false, "Email already used", null, null));
    }
    req.body = data;
    next();
  } catch (error: any) {
    console.log("60---", error);

    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

export default registerValidation;
