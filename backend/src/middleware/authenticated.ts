import { Request, Response, NextFunction } from "express";
import { responseData, tokenHandling } from "../utils";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (token === null) {
      return res
        .status(401)
        .send(responseData(401, false, "Unauthorized", null, null));
    }
    const result = tokenHandling.extractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(responseData(401, false, "Unauthorized", null, null));
    }

    res.locals.userEmail = result?.email;
    res.locals.role = result?.role;

    next();
  } catch (err: any) {
    return res.status(500).send(responseData(500, false, "", err, null));
  }
};

export default authenticated;
