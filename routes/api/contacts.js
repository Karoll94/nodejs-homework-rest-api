const express = require('express');
const router = express.Router();
const controller = require("../../controllers/contactController");
const signupController = require("../../controllers/signupController");
const loginController = require("../../controllers/loginController");
const authorizationController = require("../../controllers/authorizationController");
const auth = require("../../middleware/auth.js");

const updateAvatarCtrl = require("../../controllers/updateAvatar")
const {upload, ctrlWrapper} = require("../../middleware");

const emailVerify = require("../../controllers/emailVerify");
const resendVerificationEmailCtrl = require("../../controllers/resendEmail"); 


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


router.get("/contacts", validToken, auth, controller.getAllContacts);
router.get("/contacts/:contactId", validToken, auth, controller.ContactById);
router.delete("/contacts/:contactId", validToken, auth, controller.deleteContact);
router.post("/contacts", validToken, auth, controller.createContact);
router.put("/contacts/:contactId", validToken, auth, controller.modifyContact);
router.patch("/contacts/:contactId/favorite", validToken, auth, controller.updateFavorite);


router.post("/users/signup", signupController.signup);
router.post("/users/login", loginController.login);
router.get("/users/current", validToken, auth, authorizationController.authorization);


router.patch("/users/avatars",validToken, auth, upload.single("avatar"), ctrlWrapper(updateAvatarCtrl) );



router.get("/users/verify/:verificationToken", validToken, emailVerify);
router.post("/users/verify", resendVerificationEmailCtrl);

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
