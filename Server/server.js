const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)


const { Server } = require("socket.io")
const cors = require("cors")
app.use(cors())

let rooms = {}

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    socket.on("join-room",(data)=>{
        if(rooms[data]==null){
            rooms[data] = {
                num: 1,
                turn: Math.floor(Math.random()*2)==0? 'x': 'o'
            }
            socket.join(data)
            socket.emit("turn",rooms[data].turn)
        }
        else if(rooms[data].num==1){
            rooms[data].num = 2
            rooms[data].turn = rooms[data].turn==='x'?'o':'x'
            socket.join(data)
            socket.emit("turn",rooms[data].turn)
        }
        else socket.emit("error",{messg:"Room Full!!!"})
    })

    socket.on("send-move",(data)=>{
        socket.to(data.room).emit("recv-move",data.move)
    })
})

server.listen(3000)