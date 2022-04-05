import Coleccion from '../../model/coleccion-model.mjs';
// import moment from 'moment';
// import * as auth from '../../services/auth-service';

/**
 * Obtiene y devuelve todas las colecciones de la base de datos.
 * @param {Object} req petición de la paginación
 * @param {Object} res response de la paginación
 */
export function index(req, res){
  // Find all collections
  Coleccion.find({}, (error, collections) => {
    if(error){
      return res.status(500).json();
    }
    return res.status(200).json({collections: collections});
  })
  .sort({createdAt: -1});
}

/**
 * Crea una nueva colección en la base de datos
 * @param {Object} req contenedor de la información de la colección
 * @param {Object} res respuesta del servidor
 */
export function create(req, res){
  // Create collection
//   const id = auth.getUserId(req);
Coleccion.findOne({_id: id}, (error, user) => {
    if(error && !user){
      return res.status(500).json();
    }
    const coleccion = new Coleccion(req.body.collection);
    // coleccion.author = user._id;

    coleccion.save(error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(201).json({id: coleccion._id});
    });
  });
}

/**
 * Actualiza una colección de la base de datos.
 * @param {Object} req contenedor de la información de la colección a actualizar.
 * @param {Object} res respuesta del servidor.
 */
export function update(req, res){
  // Update a collection
//   const id = auth.getUserId(req);

  User.findOne({_id: id}, (error, user) => {
    if(error){
      return res.status(500).json();
    }
    if(!user){
      return res.status(404).json();
    }

    const coleccion = new Coleccion(req.body.collection);
    // video.author = user._id;
    Coleccion.findByIdAndUpdate({_id: coleccion._id}, coleccion, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

/**
 * Elimina una colección específica de la base de datos.
 * @param {Object} req contenedor de la información de la colección a remover.
 * @param {Object} res respuesta del servidor.
 */
export function remove(req, res){
  // Delete a coleccion
  //   const id = auth.getUserId(req);
  Coleccion.findOne({_id: req.params.id}, (error, coleccion) => {
    if(error){
      return res.status(500).json();
    }
    if(!coleccion){
      return res.status(404).json();
    }
    // if(video.author._id.toString() !== id){
    //   return res.status(403).json({message: 'Not allowed to delete another user\'s video'});
    // }
    Coleccion.deleteOne({_id: req.params.id}, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

/**
 * Obtiene la información de una colección específica.
 * @param {Object} req contenedor de la información de la colección a mostrar.
 * @param {Object} res respuesta del servidor.
 */
export function show(req, res){
  // Get video from id
  Coleccion.findOne({_id: req.params.id}, (error, coleccion) => {
    if(error){
      return res.status(500).json();
    }
    if(!coleccion){
      return res.status(400).json();
    }
    return res.status(200).json({coleccion: coleccion});
  })
}
