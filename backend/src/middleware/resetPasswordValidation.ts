import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { User } from "../db/models";
import { responseData } from "../utils";

const resetPasswordValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, confirmPassword } = req.body;
    const data = { password, confirmPassword };

    const rules: Validator.Rules = {
      password: "required|min:6",
      confirmPassword: "required|same:password",
    };
    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(
          responseData(400, false, "Bad Request", validate.errors.errors, null)
        );
    }

    const email = res.locals.userEmail;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .send(responseData(404, false, "User does not exist", null, null));
    }

    req.body = { ...data, email, user };
    next();
  } catch (error: any) {
    console.log("60---", error);

    return res.status(500).send(responseData(500, false, "", error, null));
  }
};

export default resetPasswordValidation;
