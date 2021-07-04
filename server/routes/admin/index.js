module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true,
  });
  const assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser");

  //login auth middleware: jwt token auth
  const authMiddleware = require("../../middlewares/auth");

  //resource middleware
  const resourceMiddleware = require("../../middlewares/resource");

  //create,get,getbyId,updateById,deleteById
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  });
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.delete("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send(model);
  });

  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  //upload file router
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  //login router
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // find user with username provided
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, "User doesnt exist!");
    // check if password is valid
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, "Username or Password not valid");
    //assert did things below
    /* if (!isValid) {
      return res.status(422).send({
        message: "Username or Password not valid",
      });
    } */
    // return token to frontend
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ _id: user._id }, app.get("secret"));
    res.send({ token });
  });

  // error handler
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
