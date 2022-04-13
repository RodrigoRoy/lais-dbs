import express from 'express';
const router = express.Router();
import * as controller from './video-controller.mjs';
import * as auth from '../../services/auth-service.mjs';

router.get('/video', auth.requireLogin, controller.index);
router.get('/video/:id', auth.requireLogin, controller.show);
router.post('/video', auth.requireLogin, controller.create);
router.put('/video', auth.requireLogin, controller.update);
router.delete('/video/:id', auth.requireLogin, controller.remove);

export default router;
