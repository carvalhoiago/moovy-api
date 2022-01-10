import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import { createConnection } from 'typeorm'
var cors = require('cors');


const app = express()



createConnection()


app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
app.use(routes)
app.use(express.static('public'));



app.listen(3333)
