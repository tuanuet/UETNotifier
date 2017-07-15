/* eslint-env node */
export default (server) => {
    const io = require('socket.io')(server);
    io.on('connection', function(socket){
        console.log(`a user ${socket.id} connected`);
        socket.on('disconnect', function(){
            console.log(`user ${socket.id} disconnected`);
        });
    });
};
