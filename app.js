const express = require("express");
const http = require("http");

//data base and controller routes
const logger = require('morgan');

const mongoose = require('mongoose');

const createError = require('http-errors');

const studentsRouter = require('./routes/student.js');

const dbconfig = require('./database/db.json');

const chatRouter = require('./routes/twigroute.js');

var path  = require('path')

var app = express();

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }))


app.use('/student', studentsRouter);

//app.set("view engine", "twig");

app.use('/chat',chatRouter)

const server  = http.createServer(app);
const io = require("socket.io")(server);
var i =1;

io.on('connection', (socket) => {
    
    console.log("user connected "+i);
    i++;
    socket.on('disconnect', () => {
        console.log('user '+socket.id+' disconnected');
      });

    
    socket.emit ("msg","a user  is connected");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
        
      });
      
    });

    mongoose.connect(dbconfig.mongo.uri);

app.use((req , res , next ) => {

    next(createError(404));

})

server .listen(3000, () => console.log("server is run"));


module.exports= app