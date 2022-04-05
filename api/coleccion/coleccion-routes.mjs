import express from 'express';
const router = express.Router();
import * as controller from './coleccion-controller.mjs';
// import * as auth from '../../services/auth-service';

// router.post('/coleccion', auth.requireLogin, controller.create);
// router.get('/coleccion', auth.requireLogin, controller.index);
// router.get('/coleccion/:id', auth.requireLogin, controller.show);
// router.put('/coleccion', auth.requireLogin, controller.update);
// router.delete('/coleccion/:id', auth.requireLogin, controller.remove);

router.post('/coleccion', controller.create);
router.get('/coleccion', controller.index);
router.get('/coleccion/:id', controller.show);
router.put('/coleccion', controller.update);
router.delete('/coleccion/:id', controller.remove);

export default router;
