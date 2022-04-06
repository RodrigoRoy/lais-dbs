import mongoose from 'mongoose';

const grupoSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: {type: String, required: true, trim: true, index: {unique: true}},
    proyectoInvestigacion: {type: String, trim: true},
    pais: {type: String, trim: true},
    fecha: Date,
    entidadProductora: {type: String, trim: true},
    investigacion: {type: String, trim: true},
    coordinacionProyecto: {type: String, trim: true},
    coordinacionProduccionAudiovisual: {type: String, trim: true}
  },
  contexto: {
    semblanzaBiografica: {type: String, trim: true},
  },
  contenidoEstructura: {
    alcanceContenido: {type: String, trim: true},
    valoracionSeleccionEliminacion: {type: String, trim: true}
  },
  accesoUso: {
    condicionesAcceso: {type: String, enum: ['Usos reservados para consulta in situ', 'Usos no lucrativos', 'Usos lucrativos'], default: 'Usos reservados para consulta in situ'},
    condicionesReproduccion: {type: String, trim: true}
  },
  notas: {
    notas: {type: String, trim: true},
  },
  controlDescripcion: {
    //TODO Mejorar registro de usuarios (archivistas) [{type: Schema.Types.ObjectId, ref: 'Usuario'}]
    archivista: {type: String, trim: true},
    // fechaDescripcion: createdAt
    // fechaActualizacion: updatedAt
  },
  adicional: {
    imagen: String,
    isPublic: {type: Boolean, default: true}
  }
},{
  collection: 'grupoDocumental',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
  // toObject: {virtuals: true},
  // toJSON: {virtuals: true}
});

export default mongoose.model('grupo', grupoSchema);