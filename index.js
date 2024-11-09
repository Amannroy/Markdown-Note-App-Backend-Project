import express from 'express';
import connectDB from './config/db.js';
import noteRoutes from './routes/notes.js';

const app = express();
const PORT = 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    
})

// app.get('/', (req, res) => {
//     res.send("Hello");
// })