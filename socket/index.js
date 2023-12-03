import { Server } from "socket.io"


const io = new Server(9000,{
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.email === userData.email) && users.push({ ...userData, socketId });
}

const getUser = (userId) => {
    return   users.find(user => user.email === userId)   
}

io.on('connection',(socket) => {
    console.log('user connected')
   
   
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    socket.on('sendMessage',data => {
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage',data);
    })
})