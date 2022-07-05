/**
 * Registro de rutas HTTP
 * @module routes
 */

import authRoutes from './api/auth/auth-routes.mjs'
import regRoutes from './api/register/register-routes.mjs'
import userRoutes from './api/user/user-routes.mjs'
import coleccionRoutes from './api/coleccion/coleccion-routes.mjs'
import grupoRoutes from './api/grupo/grupo-routes.mjs'
import videoRoutes from './api/video/video-routes.mjs'
import fileRoutes from './api/files/files-routes.mjs'

/**
 * Registra todas las rutas del API con prefijo "/api"
 * @param {Object} app - Objeto que representa una instancia de ExpressJS
 */
export function registerRoutes(app){
  app.use('/api', authRoutes);
  app.use('/api', regRoutes);
  app.use('/api', userRoutes);
  app.use('/api', coleccionRoutes);
  app.use('/api', grupoRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', fileRoutes);
}
