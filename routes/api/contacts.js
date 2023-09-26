const express = require('express');
const router = express.Router();
const controller = require("../../controllers/contactController");

router.get("/", controller.getAllContacts);
router.get("/:contactId", controller.ContactById);
router.delete("/:contactId", controller.deleteContact);
router.post("/", controller.createContact);
router.put("/:contactId", controller.modifyContact);
router.patch("/:contactId/favorite", controller.updateFavorite);

module.exports = router;
