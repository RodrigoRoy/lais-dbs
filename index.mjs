/**
 * Servidor web programado con express
 */

import 'dotenv/config' // variables de ambiente @see .env
import express from 'express'
const app = express()
const port = process.env.MY_PORT // puerto a usar

import {registerRoutes} from './routes.mjs'
import {setEnvironment} from './config/env.mjs'
import {connectToDB} from './config/db.mjs'

setEnvironment(app) // establecer ambiente de desarrollo o producción
connectToDB() // conexión con base de datos
registerRoutes(app) // registro de rutas http del API

console.log(`Ejecutando ambiente: ${process.env.NODE_ENV}`)

// Inicialización:
app.get("/", (req, res) => res.json({ "message": "Usar ruta /api y consultar routes.mjs" }))
app.listen(port, () => console.log(`Servidor en espera de peticiones:\n  http://${process.env.MY_HOST}:${port}/`))