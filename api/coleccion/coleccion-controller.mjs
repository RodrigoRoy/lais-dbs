import Coleccion from '../../model/coleccion-model.mjs';
// import moment from 'moment';
// import * as auth from '../../services/auth-service';

/**
 * Regresa un listado de todas las colecciones.
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de todas las colecciones en la base de datos.
 */
export function index(req, res){
  // Find all collections
  Coleccion.find({}, (error, colecciones) => {
    if(error){
      return res.status(500).json();
    }
    return res.status(200).json({colecciones: colecciones});
  })
  .sort({createdAt: -1});
}

/**
 * Crea una nueva colección.
 * @param {Object} req - Petición (request) recibida por http que incluye toda la información necesaria 
 * de una colección.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con el id de la nueva colección creada.
 */
export function create(req, res){
  // TODO @RodrigoRoy Verificar permisos de usuario y agregar autoria de usuario
  // Create collection
  // const id = auth.getUserId(req);
  // Coleccion.findOne({_id: id}, (error, user) => {
  //   if(error && !user){
  //     return res.status(500).json();
  //   }
  //   const coleccion = new Coleccion(req.body.collection);
  //   coleccion.author = user._id;

  //   coleccion.save(error => {
  //     if(error){
  //       return res.status(500).json();
  //     }
  //     return res.status(201).json({id: coleccion._id});
  //   });
  // });

  const coleccion = new Coleccion(req.body.coleccion);
  coleccion.save(error => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(201).json({message: `Registro ${coleccion.identificacion.codigoReferencia} creado`});
  });
}

/**
 * Actualiza una colección específica de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye la nueva información a 
 * actualizar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error éxito.
 */
export function update(req, res){
  // TODO @RodrigoRoy Verificar permisos y agregar id de autoria de usuario
  // Update a collection
  // const id = auth.getUserId(req);

  // User.findOne({_id: id}, (error, user) => {
  //   if(error){
  //     return res.status(500).json();
  //   }
  //   if(!user){
  //     return res.status(404).json();
  //   }

  //   const coleccion = new Coleccion(req.body.coleccion);
  //   coleccion.author = user._id;
  //   Coleccion.findByIdAndUpdate({_id: coleccion._id}, coleccion, error => {
  //     if(error){
  //       return res.status(500).json();
  //     }
  //     return res.status(200).json();
  //   });
  // });

  const coleccion = new Coleccion(req.body.coleccion);
  // findByIdAndUpdate() requiere que el  segundo parámetro incluya $set. Alternativamente usar opción "overwrite"
  // Coleccion.findOneAndReplace({_id: coleccion._id}, coleccion, error => {
  Coleccion.findByIdAndUpdate({_id: coleccion._id}, coleccion, {overwrite: true}, error => {
    console.log("Colección _id?: ", coleccion);
    if(error){
      return res.status(500).json({message: error})
    }
    // TODO: No funciona porque siempre se genera un ID
    // TODO: @RodrigoRoy Investigar si find encuentra registro. Hacer cambio también en model/video-controller
    if(!coleccion){
      return res.status(400).json({message: 'Registro vacio'});
    }
    if(!coleccion._id || !coleccion.identificacion.codigoReferencia){
      return res.status(400).json({message: 'Registro de colección vacio. Verificar propiedades \'coleccion\', \'coleccion._id\', \'coleccion.identificacion.codigoReferencia\''});
    }
    return res.status(200).json({message: `Registro ${coleccion.identificacion.codigoReferencia} actualizado`})
  });
}

/**
 * Elimina una colección de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id de la colección a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación.
 */
export function remove(req, res){
  // TODO @RodrigoRoy verificar si existe funcion findOneAndDelete o su equivalente
  // Delete a coleccion
  //   const id = auth.getUserId(req);
  Coleccion.findOne({_id: req.params.id}, (error, coleccion) => {
    if(error){
      return res.status(500).json({message: error});
    }
    if(!coleccion){
      return res.status(404).json({message: `No hay registro de la colección con id ${req.params.id}`});
    }
    // if(coleccion.author._id.toString() !== id){
    //   return res.status(403).json({message: 'Not allowed to delete another user\'s coleccion'});
    // }
    Coleccion.deleteOne({_id: req.params.id}, error => {
      if(error){
        return res.status(500).json({message: error});
      }
      return res.status(200).json({message: `Registro ${coleccion.identificacion.codigoReferencia} borrado`});
    });
  });
}

/**
 * Regresa una colección específica de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id de
 * la colección a consultar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con toda la información de la colección.
 */
export function show(req, res){
  // Get coleccion from id
  Coleccion.findOne({_id: req.params.id}, (error, coleccion) => {
    if(error){
      return res.status(500).json();
    }
    if(!coleccion){
      return res.status(400).json();
    }
    return res.status(200).json({coleccion: coleccion, message: 'Registro obtenido correctamente'});
  })
}
