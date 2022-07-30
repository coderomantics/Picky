const express = require('express');
const http = require('http');
const app = express();
const port = 3008;
const cors = require('cors');
const router = require('./router');
const socketIO = require('socket.io');



app.use(cors())
const server = http.createServer(app);
const io = socketIO((server),
    {
 cors: {
   origin: "*",
 },
});

io.on('connection', (socket) => {
  console.log('a user entered')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json());
app.use(router);


server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});



