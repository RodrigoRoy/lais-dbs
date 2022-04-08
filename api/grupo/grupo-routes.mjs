import express from 'express';
const router = express.Router();
import * as controller from './grupo-controller.mjs';
// import * as auth from '../../services/auth-service';

// router.post('/grupo', auth.requireLogin, controller.create);
// router.get('/grupo', auth.requireLogin, controller.index);
// router.get('/grupo/:id', auth.requireLogin, controller.show);
// router.put('/grupo', auth.requireLogin, controller.update);
// router.delete('/grupo/:id', auth.requireLogin, controller.remove);

router.post('/grupo', controller.create);
router.get('/grupo', controller.index);
router.get('/grupo/:id', controller.show);
router.put('/grupo', controller.update);
router.delete('/grupo/:id', controller.remove);

export default router;
