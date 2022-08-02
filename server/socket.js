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

    let questions = [];
    let players = [];
    let results = [];
    let title =''

    //io is the builder/static instance, not the connected socket
    //socket is the connected instance
    //so add event handler to socket instead of io i think
    io.on('connection', (socket) => {

        socket.emit('player-update-broadcast', players)
        socket.emit('question-update-broadcast', questions)
        socket.emit('title-update-broadcast', title)
        socket.emit('votes-update-broadcast', results)
        

        console.log(`a user entered: ${socket.id}`)
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

        socket.on('update-players', (args) => {
            console.log('chekc args', args)
            players = args
            console.log(players)
            socket.broadcast.emit('player-update-broadcast', players)
            // Saving data here
            // saveResult()
        })

        socket.on('update-questions', (args) => {
            questions = args;
            console.log(questions)
            socket.broadcast.emit('question-update-broadcast', questions)
        })

        socket.on('update-title', (args) => {
            title = args;
            socket.broadcast.emit('title-update-broadcast', title)
        })


        socket.on('submit-vote', (args) => {
           results = args;
           console.log('results', results)
           socket.broadcast.emit('vote-update-broadcast', results)
        // io.emit('submit-vote', args)
        })

        // socket.on('update-vote', (args) => {
        //     console.log('chekc vote', args)
        //     // Saving data here
        //     // saveResult()
        // })
    });

    return io
}

module.exports = { mountSocket }