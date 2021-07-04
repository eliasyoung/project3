module.exports = (options) => {
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/AdminUser");

  return async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "no jwt token, Please Login First!");
    const { _id } = jwt.verify(token, req.app.get("secret"));
    assert(_id, 401, "token not valid, Please Login First!");
    req.user = await AdminUser.findById(_id);
    assert(req.user, 401, "Please Login First!");
    await next();
  };
};
