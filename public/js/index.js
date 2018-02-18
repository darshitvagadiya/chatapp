var socket = io();

socket.on('connect', function(){
	console.log('connected to server');

	socket.emit('createMesg', {
		from: 'Darshit',
		text: 'Hey hows you from client side?'
	});
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

socket.on('newMessage', function(message){
	console.log('new message', message);
});