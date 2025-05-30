import express from 'express'
const router = express.Router();

import {
    AuthRegister,
    AuthLogin,
    logoutUser,
    authMiddleware
} from '../../controllers/user_controllers.js'

router.post("/signup", AuthRegister);
router.post("/signin", AuthLogin);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user
    })

})

export default router;