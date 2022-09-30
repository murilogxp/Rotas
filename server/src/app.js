import { createTable } from './Controller/Cliente.js';
import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import router from './routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

createTable();

app.listen(3030, ()=>console.log('Server Rodando'));

https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3031, ()=>console.log('Server Rodando em https'));