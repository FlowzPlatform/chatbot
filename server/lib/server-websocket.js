'use strict';

var _superscript = require('superscript');

var _superscript2 = _interopRequireDefault(_superscript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
app.use(express.static(__dirname + '../public'));
app.use(express.static(__dirname + '../views'));
var http = require('http').Server(app);

// var mongoose = require("mongoose");

var io = require('socket.io')(http);

// var facts = require("sfacts");

// mongoose.connect('mongodb://localhost/colorDemo');

// var options = {
//   mongoose : mongoose,
//   scope: {
//     cnet : require("conceptnet")({host:'127.0.0.1', user:'root', pass:''})
//   }
// };

// var data = ['./data/color.tbl'];

// app.get('/', function(req, res){
//   res.sendFile( 'http://localhost:3000/views/index.html');
// });

var botHandle = function botHandle(err, bot) {

  io.on('connection', function (socket) {
    console.log("User '" + socket.id + "' has connected.\n");
    socket.emit('chat message', { text: 'Welcome to the SuperScript  Demo!\n' });
    // socket.emit('chat message', {text:'<< What is your favorite color?\n'});

    socket.on('chat message', function (msg) {
      // Emit the message back first
      socket.emit('chat message', { text: ">> " + msg });
      bot.reply(socket.id, msg.trim(), function (err, resObj) {
        var color = resObj.color || "#fff";
        // console.log("Response :-- ",resObj)
        // if(resObj.string==='location')
        //   socket.emit('chat message', { type:  resObj.string });
        // else
        socket.emit('chat message', { text: "<< " + resObj.string, type: resObj.action, date: resObj.date });
      });
    });
  });

  http.listen(3000, function () {
    console.log('listening on *:3000');
  });
};

// facts.load(data, 'localdata', function(err, facts){
//   options.factSystem = facts;

//   new ss(options, function(err, botInstance){
//     botHandle(null, botInstance);
//   });
// });


// Main entry point
var options = {
  factSystem: {
    clean: false
  },
  importFile: './data.json'
};

_superscript2.default.setup(options, function (err, bot) {
  botHandle(err, bot);
});