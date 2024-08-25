const express = require('express');
const app = express();
const { connectDB } = require('./models/todoModel');
const PORT = 6060;

// Import routes
const todoRoutes = require('./routes/todoRoutes');
const viewRoutes = require('./routes/viewRoutes');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/', viewRoutes);
app.use('/', todoRoutes);

// Start server and connect to database
// Function to start the server
const startServer = async () => {
    await connectDB();
    return new Promise((resolve) => {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            resolve(server);
        });
    });
};

// Export the app and the startServer function
module.exports = {
    app,
    startServer
};

// If the file is being run directly (not imported), start the server
if (require.main === module) {
    startServer();
}
