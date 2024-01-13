// Connects Application with Database
require('../database/connection');

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');            // Library for CORS
const CORS = require('../utils/CORS');   // Custom CORS
const { cookieParser } = require('../utils/cookies');
const authRouter = require('../routers/server/auth');
const userRouter = require('../routers/server/user');
const ideaRouter = require('../routers/server/idea');
const groupRouter = require('../routers/server/group');
const pageRouter = require('../routers/server/page');
const { socketMiddleware, socketFunctions } = require('../routers/sockets');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: '/socket/chat',
    cors: {
        origin: '*',
        credentials: true
    }
});
const port = process.env.PORT;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());
app.use(cookieParser);
// app.use(CORS)
app.use(cors());

app.use('/api', authRouter, userRouter, ideaRouter, groupRouter, pageRouter);
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../public/index.html')); });
io.use(socketMiddleware);

io.on('connection', socketFunctions(io));

httpServer.listen(port, () => {
    console.log('Server is up on PORT...', port);
});