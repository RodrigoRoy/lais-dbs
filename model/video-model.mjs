import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: String,
    fecha: Date,
    lugar: String,
    pais: String,
    duracion: Number, // representado en total de segundos
    duracionString: String, // representado en total de segundos
    personasEntrevistadas: [String],
    entrevistador: String,
    camara: String,
    iluminacion: String,
    asistente: String,
    sonido: String,
    asistente: String,
  },
  contenidoEstructura: {
    descripcionGeneral: String,
    estructuraFormal: {type: String, enum: ['Grabación en campo', 'Registro con entrevista', 'Registro de materiales', 'Entrevista controlada', 'Entrevista en campo', 'Entrevista con imágenes', 'Entrevista con acción']},
    descriptorOnomastico: String,
    descriptorToponimico: String,
  },
  accesoUso: {
    idiomaOriginal: String,
    soporte: {type: String, enum: ['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']},
    numeroCasetes: Number,
    color: {type: String, enum: ['Color', 'Blanco y negro']},
    audio: {type: String, enum: ['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural']},
    sistemaGrabacion: {type: String, enum: ['NTSC', 'PAL', 'SECAM']}, // vacio si no aplica
    resolucionGrabacion: {type: String, enum: ['4K', '1080p', '1080i', '720p', '720i', '576i', '480p', '480i']},
    formatoVideoDigital: {type: String, enum: ['MP4', 'MTS', 'AVCHD', 'MOV']},
    requisitosTecnicos: String,
  },
  documentacionAsociada: {
    unidadesDescripcionRelacionadas: String,
    documentosAsociados: String,
  },
  notas: {
    notas: String,
  },
  controlDescripcion: {
    nombreArchivero: String, //[{type: Schema.Types.ObjectId, ref: 'Usuario'}]
    // TODO: @RodrigoRoy Qué ocurre con la definición de fechas?
    // fechaDescripcion: new Date().toISOString().substring(0, 10),
    // fechaActualizacion: new Date().toISOString().substring(0, 10),
  },
  adicional: {
    imagen: String,
    video: String,
    calificacion: String,
    isPublic: {type: Boolean, default: true}
  }
},{
  collection: 'unidadDocumental',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
	// toObject: {virtuals: true},
	// toJSON: {virtuals: true}
});

export default mongoose.model('video', videoSchema);
