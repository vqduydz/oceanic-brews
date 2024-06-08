import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserData {
  email: string | null;
  verified: boolean | null;
  active: boolean | null;
  role: string;
}

const generateToken = (data: any, expiresIn?: string | number): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: expiresIn || "1h",
  });

  return token;
};

const generateRefreshToken = (
  data: any,
  expiresIn?: string | number
): string => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: expiresIn || "14d",
  });

  return token;
};

const extractToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }
  return null;
};

const extractRefreshToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }
  return null;
};

export default {
  generateToken,
  generateRefreshToken,
  extractToken,
  extractRefreshToken,
};
