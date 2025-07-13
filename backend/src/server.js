import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Ensure the database connection is established
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/notes", notesRoutes);


app.listen(process.env.PORT, () => {
  console.log('Server is running on port 5001');
});