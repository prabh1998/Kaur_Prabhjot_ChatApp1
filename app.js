var express = require('express');
var app = express();

// add socket here
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// attach our chat app ti the server
io.attach(server);

io.on('connection', function(socket) {// socket is your connection
    console.log("a user is connected");
    socket.emit('connected', { sID: socket.id, message: "new connection"});

    socket.on('chat_message', function(msg) {
        console.log(msg); // let's see what the playload is from the client side

        // tell the connection manager (io) to send this message to everyone
        // anyone connected to our chat app will get this message (including the sender)
        io.emit('new_message', {id: socket.id, message: msg })
    })
    // candidate zone

    socket.on('Candidate', function(Candidate){
        console.log(Candidate);
        io.emit('newCandidate', Candidate);
    })

    // Candidate join
    socket.on('CandidateJoined', function(Candidate){
        console.log(Candidate + 'has joined the chat');
        io.emit('newCandidate', Candidate);
    })
    
    socket.on('disconnect', function(){ 
        console.log('a user has disconnected');
   
    });

});