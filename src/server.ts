/**
 * Main server entry point
 * Initializes cron jobs and starts Express server
 */

import { registerAllCronJobs } from '../cron-jobs';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

// Server port configuration
const PORT: number = Number(process.env.PORT) || 3000;

/**
 * Initialize cron jobs if CRON_SERVER env variable is set
 * This allows running cron jobs only on designated servers
 */
if (process.env.CRON_SERVER) {
	registerAllCronJobs();
	console.log('📅 Cron jobs registered successfully');
}

/**
 * Start Express server and listen on configured port
 * Logs server URL once started
 */
app.listen(PORT, () => {
	console.log(`
    🚀 Server is running!
    🔌 Port: ${PORT}
    🌐 URL: http://localhost:${PORT}
    `);
});
