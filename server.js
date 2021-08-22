const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));






const server = app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
let io = require('socket.io')(server)

io.on('connection',(socket)=>{
    console.log(`new connect : ${socket.id}`)

    socket.on('comment',(data)=>{
        console.log(data)
        data.time = new Date()
        socket.broadcast.emit('comment',data)
    })


    socket.on('typing',data=>{
        socket.broadcast.emit('typing',data);
        })
})

