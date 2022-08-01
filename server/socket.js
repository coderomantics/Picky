const { saveResult } = require('./services')

const socketIO = require('socket.io');

//To display the number of client in the frontend
//Step 1: Emit an event(e.g. update-client-number) to send the total number of connected client to the frontend, on the connection event in backend
//Step 2: Listen to that event in frontend, and update the display number
//Step 3: Emit the same event in the disconnect handler

const mountSocket = (server) => {
    const io = socketIO((server),
    {
        cors: {
            origin: "*",
        },
    });

    //io is the builder/static instance, not the connected socket
    //socket is the connected instance
    //so add event handler to socket instead of io i think
    io.on('connection', (socket) => {
        console.log('a user entered')
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

        socket.on('update-players', (args) => {
            console.log('chekc args', args)
            // Saving data here
            // saveResult()
        })
    });

    return io
}

module.exports = { mountSocket }