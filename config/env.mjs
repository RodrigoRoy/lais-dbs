

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

// TODO@EmmanuelCruz
// Verificar la exportación de variables de entorno (export NODE_ENV=production) @RodrigoRoy sucede
// el mismo problema que se presentó en Linux

/**
 * Establece el ambiente de desarrollo: production, development
 * @param {Object} app - Aplicación de expressJS
 */
export function setEnvironment(app){
  if(process.env.NODE_ENV !== 'production'){
    setDevEnv(app);
  }
  else {
    setProdEnv(app);
  }
}

/**
 * Establece ambiente de desarrollo con logs adicionales
 * @param {Object} app - Aplicación de expressJS
 */
function setDevEnv(app){
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = `${process.env.MY_DB_HOST}/${process.env.MY_DB_NAME_DEV}`; // mongodb://localhost:27017/lais-video-dev
  process.env.TOKEN_SECRET = `${process.env.MY_TOKEN_DEV}`;
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

/**
 * Establece ambiente de producción sin logs adicionales
 * @param {Object} app - Aplicación de expressJS
 */
function setProdEnv(app){
  process.env.NODE_ENV = 'production';
  process.env.DB_URL = `${process.env.MY_DB_HOST}/${process.env.MY_DB_NAME_PROD}`
  process.env.TOKEN_SECRET = `${process.env.MY_TOKEN_PROD}`;
  app.use(bodyParser.json());
//   app.use(express.static(__dirname + '/../../dist'));
}
