import jwt from "jsonwebtoken";
import adminModel from "../models/Admin.js";

const checkAdmin = async (req, res, next) => {
  let token;
  const { authorizatoin } = req.headers;
  if (authorizatoin && authorizatoin.startsWith("Bearer")) {
    try {
      token = authorizatoin.split(" ")[1];
      // verify token
      const { adminId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // get Admin from token
      const admin = await adminModel.findById(adminId).select("-password");
      if (!admin) {
        return res.status(401).json({ msg: "Admin not found" });
      }
      // add admin to request
      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
  }
};
export default checkAdmin;
