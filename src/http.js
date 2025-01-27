import express from 'express';
import path from 'path';

const porta = 8000;
const app = express();
const serverHttp = require('http').createServer(app);
const io = require('socket.io')(serverHttp);

app.use(express.static(path.join(__dirname, '..', '/')));

export  {
    serverHttp, io, porta
}