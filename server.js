import express from 'express';
import path from 'path';
import makeStore from './voting-server/src/store';

const app = express();

const port = process.env.PORT || 8080;

var server = app.listen(port, function () {
	console.log('Server running on port ' + port);
});

var io = require('socket.io')(server);

const store = makeStore();

store.subscribe(
		() => io.emit('state', store.getState().toJS())
);

io.on('connection', function (socket) {
 console.log("Received client connection");
		socket.emit('state', store.getState().toJS());
		socket.on('action', store.dispatch.bind(store));			
  /*socket.emit('server event', { foo: 'bar' });
  socket.on('client event', function (data) {
    console.log(data);
  });*/
});


store.dispatch({
	type: 'SET_ENTRIES',
	entries: require('./voting-server/entries.json')
});
store.dispatch({type: 'NEXT'});

app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
	console.log("Servicing request... from " + path.join(__dirname, 'dist/index.html'));  
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

	
