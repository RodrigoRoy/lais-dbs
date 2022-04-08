import Grupo from '../../model/grupo-model.mjs';
// import moment from 'moment';
// import * as auth from '../../services/auth-service';

/**
 * Regresa un listado de todas los Grupos.
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de todas las grupos en la base de datos.
 */
export function index(req, res){
  Grupo.find({}, (error, grupos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(200).json({grupos: grupos});
  })
  .sort({createdAt: -1});
}

/**
 * Crea un nuevo grupo.
 * @param {Object} req - Petición (request) recibida por http que incluye toda la información necesaria 
 * de un grupo.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con el id del nuevo grupo
 */
export function create(req, res){
  // TODO @RodrigoRoy Verificar permisos de usuario y agregar autoria de usuario
  // Create collection
  // const id = auth.getUserId(req);
  // Grupo.findOne({_id: id}, (error, user) => {
  //   if(error && !user){
  //     return res.status(500).json();
  //   }
  //   const Grupo = new Grupo(req.body.collection);
  //   Grupo.author = user._id;

  //   Grupo.save(error => {
  //     if(error){
  //       return res.status(500).json();
  //     }
  //     return res.status(201).json({id: Grupo._id});
  //   });
  // });

  const grupo = new Grupo(req.body.grupo);
  grupo.save(error => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(201).json({message: `Registro ${grupo.identificacion.codigoReferencia} creado`});
  });
}

/**
 * Actualiza un grupo específico de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye la nueva información a 
 * actualizar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito
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

  //   const Grupo = new Grupo(req.body.Grupo);
  //   Grupo.author = user._id;
  //   Grupo.findByIdAndUpdate({_id: Grupo._id}, Grupo, error => {
  //     if(error){
  //       return res.status(500).json();
  //     }
  //     return res.status(200).json();
  //   });
  // });

  const grupo = new Grupo(req.body.grupo);
  // findByIdAndUpdate() requiere que el  segundo parámetro incluya $set. Alternativamente usar opción "overwrite"
  // Grupo.findOneAndReplace({_id: grupo._id}, grupo, error => {
  Grupo.findByIdAndUpdate({_id: grupo._id}, grupo, {overwrite: true}, (error, document) => {
    console.log("Grupo encontrado?: ", document);
    if(error){
      return res.status(500).json({message: error})
    }
    if(!grupo.identificacion.codigoReferencia){
      return res.status(400).json({message: 'Registro de grupo vacio. Verificar propiedades \'grupo\', \'grupo._id\', \'grupo.identificacion.codigoReferencia\''});
    }
    if(!document){
      return res.status(400).json({message: `El registro con id ${grupo._id} no existe`});
    }
    return res.status(200).json({message: `Registro ${grupo.identificacion.codigoReferencia} actualizado`})
  });
}

/**
 * Elimina un grupo de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del grupo a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación
 */
export function remove(req, res){
    // TODO @RodrigoRoy Verificar permisos y autoria del usuario
    // const id = auth.getUserId(req);
    // Grupo.findOne({_id: req.params.id}, (error, grupo) => {
    //     if(error){
    //         return res.status(500).json({message: error});
    //     }
    //     if(!grupo){
    //         return res.status(404).json({message: `No hay registro del grupo con id ${req.params.id}`});
    //     }
    //     if(grupo.author._id.toString() !== id){
    //         return res.status(403).json({message: 'Not allowed to delete another user\'s Grupo'});
    //     }
    //     grupo.deleteOne({_id: req.params.id}, error => {
    //         if(error){
    //             return res.status(500).json({message: error});
    //         }
    //         return res.status(200).json({message: `Registro ${grupo.identificacion.codigoReferencia} borrado`});
    //     });
    // });
    Grupo.findByIdAndDelete({_id: req.params.id}, (error, grupo) => {
        if(error){
            return res.status(500).json({message: error});
        }
        if(!grupo){
            return res.status(400).json({message: `El registro con id ${req.params.id} no existe`});
        }
        return res.status(200).json({message: `Registro ${grupo.identificacion.codigoReferencia} borrado`});
    });
}

/**
 * Regresa un grupo específica de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del
 * grupo a consultar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con toda la información del grupo
 */
export function show(req, res){
  Grupo.findOne({_id: req.params.id}, (error, grupo) => {
    if(error){
      return res.status(500).json({message: error});
    }
    if(!grupo){
      return res.status(400).json({message: `No hay registro del grupo con id ${req.params.id}`});
    }
    return res.status(200).json({grupo: grupo, message: 'Registro obtenido correctamente'});
  })
}
