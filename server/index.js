const express = require('express');
const http = require('http');
const app = express();
const port = 3008;
const cors = require('cors');
const router = require('./router');
const { mountSocket } = require('./socket')



app.use(cors())
const server = http.createServer(app);


app.use(express.json());
app.use(router);

const io = mountSocket(server);


server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});



