const express = require('express')
const app = express()
const port = 4000
const ipc = require('node-ipc')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`process2 on ${port}!`))

ipc.config.id   = 'test';
ipc.config.retry= 1500;

ipc.connectTo(
    'test',
    function(){
        ipc.of.test.on("connect", () => {
            console.log("process 2 connected");
        });
        ipc.of.test.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world'.notice);
            }
        );
        ipc.of.test.on(
            'message',  //any event or message type your server listens for
            function(data){
                ipc.log('got a message from world : '.debug, data);
                console.log('process2 recieved a message', data)
            }
        );
    }
);