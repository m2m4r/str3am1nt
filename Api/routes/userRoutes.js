const express = require("express");
const router = express.Router();
const { User } = require("../models");
const passport = require("passport");
const userController = require("../config/controllers/userController");

const isLoggedIn = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ where: { email: email } });
  if (user.dataValues.isLoggedIn === true) {
    res.sendStatus(401);
  } else {
    next();
  }
};

router.post("/register", userController.register);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/api/user/handleError" }),
  isLoggedIn,
  userController.login
);
router.put("/update", userController.update);
router.post("/logout", userController.logOut);
router.get("/me", userController.me);
router.post("/me", userController.meToken);
router.post("/createRole", userController.addRole);
router.post("/list", userController.list);
router.get("/listEmail/:eventId", userController.listEmail);
router.get("/list", userController.listUsers);
router.delete("/delete/:id", userController.delete);
router.get("/findByEmail/:email", userController.findByEmail);
router.post("/saveAddress", userController.saveAddress);
router.post("/checkAddress", userController.checkAddress);
router.get("/handleError", userController.handleError);
router.get("/getPOAP/:email", userController.getPOAP);

module.exports = router;
