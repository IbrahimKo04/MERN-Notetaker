import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors(
  {
    origin : "http://localhost:5173"
  }
));

app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
  console.log(`We just got a request! : ${req.method} ${req.url}`);
  next(); // Pass the request to the next middleware or route handler
});


app.use(rateLimiter)

app.use("/api/notes", notesRoutes);
connectDB().then(()=>{
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 5001');
});
}); // Ensure the database connection is established



