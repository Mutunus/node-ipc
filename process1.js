const express = require('express')
const app = express();
const port = 3000;
const ipc = require('node-ipc');

ipc.config.id   = 'test';
ipc.config.retry= 1500;

ipc.serve(
    function(){
        ipc.server.on(
            'message',
            function(data, socket){
                ipc.log('got a message : '.debug, data);
            }
        );
        ipc.server.on(
            'socket.disconnected',
            function(socket, destroyedSocketID) {
                ipc.log('client ' + destroyedSocketID + ' has disconnected!');
            }
        );
    }
);

ipc.server.start();

app.get('/:message', (req, res) => {
    const { message } = req.params
    ipc.server.broadcast("message", message);
});

app.listen(port, () => console.log(`process1 on ${port}!`));
