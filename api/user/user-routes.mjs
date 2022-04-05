/**
 * Definición de las rutas http para consulta de usuarios
 * @module api/user/user-routes
 */
import express from "express";
const router = express.Router();
import * as controller from './user-controller.mjs'

router.get('/user', controller.index);
// TODO @RodrigoRoy
// /user/:id GET
// /user/:id PUT
// /user/:id DELETE

/**
 * Registra todas las rutas para consulta usuarios usando el prefijo "/user"
 * mediante una instancia de la clase express
 */
export default router;