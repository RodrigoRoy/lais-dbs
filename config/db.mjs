import mongoose from 'mongoose'

/**
 * Conecta a base de datos MongoDB
 * process.env.DB_URL debe estar asignada durante el establecimiento del ambiente
 */
export function connectToDB(){
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true},
  error => {
    if(error){
      console.log('No se pudo conectar a base de datos');
      throw error; // Porque no podemos hacer nada sin base de datos
    }
    else{
      console.log('Conectado a MongoDB!');
    }
  });
}