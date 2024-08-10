const express = require('express');
const app = express();
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
app.listen(PORT, async () => {
    console.log(`Listening at: http://localhost:${PORT}/`);
    await require('./models/todoModel').connectDB();
});
