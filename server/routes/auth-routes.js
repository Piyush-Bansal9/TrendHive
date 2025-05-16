const express = require("express");
const router = express.Router;

const {
    AuthRegister,
    AuthLogin
} = require("../controllers/user_controllers")

router.post("/signup", AuthRegister);
router.post("/signin", AuthLogin)

modeule.exports = router;



