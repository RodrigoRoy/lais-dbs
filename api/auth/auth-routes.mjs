/**
 * Definición de las rutas http para autentificación de usuarios
 * @module api/auth/auth-routes
 */
import express from "express"
const router = express.Router()
import * as controller from './auth-controller.mjs'

router.post('/auth', controller.index);

/**
 * Registra todas las rutas para autentificación de usuario usando el prefijo "/auth"
 * mediante una instancia de la clase express
 */
export default router;