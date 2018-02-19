var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatApp'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', function(message, callback){
		console.log('createMessage ', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('user is disconnected from client side');
	});
})

server.listen(port, function(){
	console.log(`Express server listening on ${port}`);
}); 