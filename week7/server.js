const express = require('express');
const app = express();
const { connectDB, getTodos } = require('./models/todoModel');
const PORT = 6060;
// Import routes
const todoRoutes = require('./routes/todoRoutes');
const viewRoutes = require('./routes/viewRoutes');

//socket
const { Server } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
// Middleware
app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/', viewRoutes);
app.use('/', todoRoutes);

// Start server and connect to database
// Function to start the server


io.on('connection',async (socket)=>{

    const result = await getTodos();
    obj = { statusCode: 200, data: result, message: 'get all todos successful' }
    socket.emit('tasks', obj);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



const startServer = async () => {
    await connectDB();
    return new Promise((resolve) => {
        const server = http.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            resolve(server);
        });
    });
};

// Export the app and the startServer function
module.exports = {
    app,
    startServer,
    io
};

// If the file is being run directly (not imported), start the server
if (require.main === module) {
    startServer();
}
