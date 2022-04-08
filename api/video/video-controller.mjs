import Video from '../../model/video-model.mjs';
// import moment from 'moment';
// import * as auth from '../../services/auth-service';

/**
 * Regresa un listado de todos los videos.
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de todos los videos en la base de datos.
 */
export function index(req, res){
  // Find all videos
  Video.find({}, (error, videos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(200).json({videos: videos, message: "Operación exitosa"});
  })
  .sort({createdAt: -1});
}

/**
 * Crea un nuevo video. Se asume que la información en petición es correcta
 * @param {Object} req - Petición (request) recibida por http que incluye toda la información necesaria de un video.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con el id del nuevo video creado.
 */
export function create(req, res){
  // TODO @RodrigoRoy Incluir ID de usuario a video
  // Create video
  // const id = auth.getUserId(req);
  // Video.findOne({_id: id}, (error, user) => {
  //   if(error && !user){
  //     return res.status(500).json({message: error});
  //   }
  //   const video = new Video(req.body.video);
  //   video.author = user._id;

  //   video.save(error => {
  //     if(error){
  //       return res.status(500).json({message: error});
  //     }
  //     return res.status(201).json({id: video._id, message: "Se ha creado el video exitosamente"});
  //   });
  // });

  const video = new Video(req.body.video);

  video.save(error => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(201).json({id: video._id, message: `Registro ${video.identificacion.codigoReferencia} creado`});
  });
}

/**
 * Actualiza un video específico de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye la nueva información a actualizar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error éxito.
 */
export function update(req, res){
  // TODO @RodrigoRoy Verificación de usuario al borrar
  // Update a video
  // const id = auth.getUserId(req);
  // User.findOne({_id: id}, (error, user) => {
  //   if(error){
  //     return res.status(500).json({message: error});
  //   }
  //   if(!user){
  //     return res.status(404).json({message: "No se encontró el video en la base"});
  //   }

  //   const video = new Video(req.body.video);
  //   video.author = user._id;
  //   Video.findByIdAndUpdate({_id: video._id}, video, error => {
  //     if(error){
  //       return res.status(500).json({message: error});
  //     }
  //     return res.status(200).json();
  //   });
  // });

  const video = new Video(req.body.video);
  // findByIdAndUpdate() requiere que el  segundo parámetro incluya $set. Alternativamente usar opción "overwrite"
  // Video.findOneAndReplace({_id: video._id}, video, error => {
  Video.findByIdAndUpdate({_id: video._id}, video, {overwrite: true}, (error, document) => {
    if(error){
      return res.status(500).json({message: error})
    }
    if(!video.identificacion.codigoReferencia){
      return res.status(400).json({message: 'Registro de video vacio. Verificar propiedades \'video\', \'video._id\', \'video.identificacion.codigoReferencia\''});
    }
    if(!document){
      return res.status(400).json({message: `El registro con id ${grupo._id} no existe`});
    }
    return res.status(200).json({message: `Registro ${video.identificacion.codigoReferencia} actualizado`})
  });
}

/**
 * Elimina un video de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del video a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación.
 */
export function remove(req, res){
  // const id = auth.getUserId(req);
  // Video.findOne({_id: req.params.id}, (error, video) => {
  //   if(error){
  //     return res.status(500).json({message: error});
  //   }
  //   if(!video){
  //     return res.status(404).json({message: error});
  //   }
  //   if(video.author._id.toString() !== id){
  //     return res.status(403).json({message: 'Not allowed to delete another user\'s video'});
  //   }
  //   Video.deleteOne({_id: req.params.id}, error => {
  //     if(error){
  //       return res.status(500).json({message: error});
  //     }
  //     return res.status(200).json({message: `Registro ${video.identificacion.codigoReferencia} borrado`});
  //   });
  // });
  Video.findByIdAndDelete({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json({message: error});
    }
    if(!video){
      return res.status(400).json({message: `El registro con id ${req.params.id} no existe`});
    }
    return res.status(200).json({message: `Registro ${video.identificacion.codigoReferencia} borrado`});
  });
}

/**
 * Regresa un video específico de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del video a consultar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con toda la información del video.
 */
export function show(req, res){
  // Get video from id
  Video.findOne({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json({message: error});
    }
    if(!video){
      return res.status(400).json({message: error});
    }
    return res.status(200).json({video: video, message: "Registro obtenido correctamente"});
  })
}
