import videoRoutes from './api/video/video-routes.mjs'

export function registerRoutes(app){
    // app.use('/api', taskRoutes);
    // app.use('/api', regRoutes);
    // app.use('/api', userRoutes);
    // app.use('/api', authRoutes);
    app.use('/api', videoRoutes);
    // app.use('/api', coleccionRoutes);
  }  