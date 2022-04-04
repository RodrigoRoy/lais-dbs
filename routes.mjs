import authRoutes from './api/auth/auth-routes.mjs'
import regRoutes from './api/register/register-routes.mjs'
import userRoutes from './api/user/user-routes.mjs'
import videoRoutes from './api/video/video-routes.mjs'

export function registerRoutes(app){
  app.use('/api', authRoutes);
  app.use('/api', regRoutes);
  app.use('/api', userRoutes);
  app.use('/api', videoRoutes);
}