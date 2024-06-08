import { NextFunction, Request, Response } from "express";
import { responseData } from "../utils";

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.role;

    if (roles.includes(userRole)) {
      return next();
    }
    return res
      .status(403)
      .send(
        responseData(
          200,
          true,
          "You do not have permission to perform this action",
          null,
          null
        )
      );
  };
};
export default checkRole;
