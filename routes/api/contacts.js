const express = require('express');
const router = express.Router();
const controller = require("../../controllers/contactController");
const signupController = require("../../controllers/signupController");
const loginController = require("../../controllers/loginController");
const authorizationController = require("../../controllers/authorizationController");
const auth = require("../../middleware/auth.js");



router.get("/", controller.getAllContacts);
router.get("/:contactId", controller.ContactById);
router.delete("/:contactId", controller.deleteContact);
router.post("/", controller.createContact);
router.put("/:contactId", controller.modifyContact);
router.patch("/:contactId/favorite", controller.updateFavorite);


const invalidatedTokens = new Set();

const validToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (invalidatedTokens.has(token)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Unathorized: Invalid token",
      data: "Unathorized",
    });
  }
  next();
};


router.post("/users/signup", signupController.signup);
router.post("/users/login", loginController.login);


router.get("/users/current", validToken, auth, authorizationController.authorization);

router.post("/users/logout", validToken, auth,  (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  invalidatedTokens.add(token);
  console.log(Array.from(invalidatedTokens));
  res.status(204).json({
    status: "success",
    code: 204,
    message: "Logout: successful",
    data: "Success",
  });
});


module.exports = router;
