/**
 * Import required dependencies for cron job management
 */
import cron from 'node-cron';
import jobs from './jobs';

/**
 * Parameters required to define a cron job
 */
type JobParams = {
	name: string; // Display name of the job
	slug: string; // Unique identifier for the job
	schedule: string; // Cron schedule expression
	task: () => Promise<void>; // Async function to execute
	retries?: number; // Number of retry attempts on failure
};

/**
 * Parameters required for job execution
 */
type JobExecutionParams = {
	name: string; // Display name of the job
	task: () => Promise<void>; // Async function to execute
	retries?: number; // Number of retry attempts on failure
};

/**
 * Executes a job with retry logic on failure
 * @param params - Job execution parameters
 * @param attempt - Current attempt number (default: 1)
 */
const executeJob = async (
	{ name, task, retries }: JobExecutionParams,
	attempt = 1
) => {
	try {
		console.log(`[Cron] Executing job: ${name}, Attempt: ${attempt}`);
		await task();
		console.log(`[Cron] Job "${name}" executed successfully.`);
	} catch (error) {
		console.error(`[Cron] Job "${name}" failed on attempt ${attempt}:`, error);
		if (retries && attempt < retries) {
			console.log(`[Cron] Retrying job "${name}" in 10 seconds...`);
			// Retry the job after 10 second delay
			setTimeout(() => executeJob({ name, task, retries }, attempt + 1), 10000);
		} else {
			console.error(
				`[Cron] Job "${name}" failed after ${attempt} attempts. Skipping.`
			);
		}
	}
};

/**
 * Registers all cron jobs defined in the jobs configuration
 * Schedules each job according to its cron expression and sets up error handling
 */
export const registerAllCronJobs = () => {
	jobs.forEach(({ name, schedule, task, retries }: JobParams) => {
		cron.schedule(schedule, async () => {
			await executeJob({ name, task, retries });
		});
		console.log(`[Cron] Scheduled job: "${name}" (${schedule})`);
	});
};
