var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.on('createMesg', function(data){
		io.emit('newMessage', {
			from: data.from,
			text: data.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('user is disconnected from client side');
	});
})

server.listen(port, function(){
	console.log(`Express server listening on ${port}`);
}); 