import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
interface JWT_payload {
  userid: string;
  email: string;
}

export const generateAccessToken = (payload: JWT_payload) => {
  return jwt.sign(payload, String(JWT_SECRET_KEY), { expiresIn: "1h" });
};

export const generateRefreshToken = (payload: JWT_payload) => {
    return jwt.sign(payload, String(JWT_SECRET_KEY), { expiresIn: "7d" });
}
