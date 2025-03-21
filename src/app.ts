// Import required modules from express
import express, { Request, Response } from 'express';

// Initialize express application
const app = express();

// Add middleware to parse JSON payloads
app.use(express.json());

// Define root route handler
// Returns a message indicating the server is running
app.get('/', (req: Request, res: Response) => {
	res.send('🚀 Express + TypeScript + Cron Jobs Running!');
});

// Export app for use in other modules
export default app;
