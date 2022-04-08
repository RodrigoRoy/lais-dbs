import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: {type: String, required: true, trim: true, index: {unique: true}},
    fecha: {type: Date},
    lugar: {type: String, trim: true},
    pais: {type: String, trim: true},
    duracion: Number, // representado en total de segundos
    duracionString: {type: String, trim: true}, // representado en total de segundos
    personasEntrevistadas: {type: [String], trim: true},
    entrevistador: {type: String, trim: true},
    camara: {type: String, trim: true},
    iluminacion: {type: String, trim: true},
    asistente: {type: String, trim: true},
    sonido: {type: String, trim: true},
    asistente: {type: String, trim: true},
  },
  contenidoEstructura: {
    descripcionGeneral: {type: String, trim: true},
    estructuraFormal: {type: String, enum: ['Grabación en campo', 'Registro con entrevista', 'Registro de materiales', 'Entrevista controlada', 'Entrevista en campo', 'Entrevista con imágenes', 'Entrevista con acción']},
    descriptorOnomastico: {type: String, trim: true},
    descriptorToponimico: {type: String, trim: true},
  },
  accesoUso: {
    idiomaOriginal: {type: String, trim: true},
    soporte: {type: String, enum: ['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']},
    numeroCasetes: {type: Number},
    color: {type: String, enum: ['Color', 'Blanco y negro']},
    audio: {type: String, enum: ['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural']},
    sistemaGrabacion: {type: String, enum: ['NTSC', 'PAL', 'SECAM']}, // vacio si no aplica
    resolucionGrabacion: {type: String, enum: ['4K', '1080p', '1080i', '720p', '720i', '576i', '480p', '480i']},
    formatoVideoDigital: {type: String, enum: ['MP4', 'MTS', 'AVCHD', 'MOV']},
    requisitosTecnicos: {type: String, trim: true},
  },
  documentacionAsociada: {
    unidadesDescripcionRelacionadas: {type: String, trim: true},
    documentosAsociados: {type: String, trim: true},
  },
  notas: {
    notas: {type: String, trim: true},
  },
  controlDescripcion: {
    nombreArchivero: {type: String, trim: true}, //[{type: Schema.Types.ObjectId, ref: 'Usuario'}]
    // fechaDescripcion: new Date().toISOString().substring(0, 10),
    // fechaActualizacion: new Date().toISOString().substring(0, 10),
  },
  adicional: {
    imagen: {type: String, trim: true},
    video: {type: String, trim: true},
    calificacion: {type: String, trim: true},
    isPublic: {type: Boolean, default: true}
  }
},{
  collection: 'unidadDocumentalVideo',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
	// toObject: {virtuals: true},
	// toJSON: {virtuals: true}
});

export default mongoose.model('video', videoSchema);
