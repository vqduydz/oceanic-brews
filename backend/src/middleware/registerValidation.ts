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
      gender,
      phoneNumber,
    };

    const rules: Validator.Rules = {
      email: "required|email",
      password: "required|min:8",
      confirmPassword: "required|same:password",
      firstName: "required|string|max:50",
      lastName: "required|string|max:50",
      gender: "required|string",
      phoneNumber: "required|number",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(responseData(400, "Bad Request", validate.errors, null));
    }

    const user = await User.findOne({
      where: { email: data.email },
    });
    if (user) {
      return res
        .status(400)
        .send(responseData(400, "Email already used", null, null));
    }
    next();
  } catch (error: any) {
    return res.status(500).send(responseData(500, "", error, null));
  }
};

export default registerValidation;
