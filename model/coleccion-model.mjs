import mongoose from 'mongoose';

const coleccionSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: {type: String, required: true, trim: true, index: {unique: true}},
    titulo: {type: String, trim: true},
    pais: {type: String, trim: true},
    fecha: Date,
    nivelDescripcion: {type: String, enum: ['Colección', 'Grupo', 'Subgrupo', 'Serie', 'Subserie'], default: 'Colección'},
    // volumenSoporte: String,
    // lugar?: String,
    coordinacion: {type: String, trim: true}
  },
  contexto: {
    historiaInstitucional: {type: String, trim: true},
    historiaArchivistica: {type: String, trim: true},
    semblanzaBiografica: {type: String, trim: true},
  },
  contenidoEstructura: {
    alcanceContenido: {type: String, trim: true},
    valoracionSeleccionEliminacion: {type: String, trim: true},
    nuevosIngresos: {type: String, trim: true},
    organizacion: {type: String, trim: true}
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
    // TODO Refinar nombre de norma
    reglasNormas: {type: String, trim: true, default: 'Norma de catalogación LAIS 2022 basada en ISAD(G)'},
    // fechaDescripcion: createdAt
    // fechaActualizacion: updatedAt
  },
  adicional: {
    imagen: String,
    isPublic: {type: Boolean, default: true}
  }
},{
  collection: 'coleccionVideo',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
  // toObject: {virtuals: true},
  // toJSON: {virtuals: true}
});

export default mongoose.model('coleccion', coleccionSchema);
