import express from "express"
const router = express.Router()
import * as controller from './register-controller.mjs'

router.post('/register', controller.index);

export default router;