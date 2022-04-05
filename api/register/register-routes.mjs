/**
 * Definición de las rutas http para registro de usuarios
 * @module api/register/register-routes
 */

import express from "express"
const router = express.Router()
import * as controller from './register-controller.mjs'

router.post('/register', controller.index);

/**
 * Registra todas las rutas para registro de nuevos usuarios usando el prefijo "/register"
 * mediante una instancia de la clase express
 */
export default router;