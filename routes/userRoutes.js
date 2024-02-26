const express = require("express");
const { regiserUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", regiserUser);

router.post("/login", loginUser);

router.get("/current",validateToken, currentUser);

module.exports = router;