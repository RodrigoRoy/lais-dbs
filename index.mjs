import 'dotenv/config'

import express from 'express'
const app = express()
const port = process.env.MY_PORT

import {registerRoutes} from './routes.mjs'
import {setEnvironment} from './config/env.mjs'
import {connectToDB} from './config/db.mjs'

setEnvironment(app)
connectToDB()
registerRoutes(app);
console.log(process.env.NODE_ENV)

app.get("/", (req, res) => res.json({ "message": "hello express" }));

app.listen(process.env.MY_PORT, () => console.log("Hello ESM with esm !!"));