import videoRoutes from './api/video/video-routes.mjs'
import coleccionRoutes from './api/coleccion/coleccion-routes.mjs'

/**
 * Registra las rutas del sistema a la aplicación de Express.
 * @param {Object} app - Aplicación de ExpressJS
 */
export function registerRoutes(app){
  // app.use('/api', taskRoutes);
  // app.use('/api', regRoutes);
  // app.use('/api', userRoutes);
  // app.use('/api', authRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', coleccionRoutes);
}  