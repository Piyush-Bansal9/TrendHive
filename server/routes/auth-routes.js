import express from 'express'
const router = express.Router();

import {
    AuthRegister,
    AuthLogin
} from '../controllers/user_controllers.js'

router.post("/signup", AuthRegister);
router.post("/signin", AuthLogin)

export default router;