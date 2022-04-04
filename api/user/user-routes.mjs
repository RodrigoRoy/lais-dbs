import express from "express";
const router = express.Router();
import * as controller from './user-controller.mjs'

router.get('/user', controller.index);

export default router;