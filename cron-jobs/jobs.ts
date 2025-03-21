// Interface defining the structure of a CronJob
type CronJob = {
	/** Display name of the job */
	name: string;
	/** URL-friendly identifier for the job */
	slug: string;
	/** Cron schedule expression (e.g. '0 1 * * *' for 1 AM daily) */
	schedule: string;
	/** Async function containing the job's business logic */
	task: () => Promise<void>;
	/** Number of retry attempts if job fails (optional) */
	retries?: number;
};

// Array of scheduled cron jobs for the application
const jobs: CronJob[] = [
	{
		name: 'Process Pending Payments',
		slug: 'process-pending-payments',
		schedule: '0 1 * * *', // Runs at 1 AM daily
		task: async () => {
			try {
				console.log('[Job] Processing pending payments...');
				// Payment processing logic
				console.log('[Job] Payments processed successfully.');
			} catch (error) {
				console.error('[Job Error] Failed to process payments:', error);
				throw error;
			}
		},
		retries: 3,
	},
	{
		name: 'Expire Inactive Subscriptions',
		slug: 'expire-inactive-subscriptions',
		schedule: '0 2 * * *', // Runs at 2 AM daily
		task: async () => {
			try {
				console.log('[Job] Expiring inactive subscriptions...');
				// Subscription expiration logic
				console.log('[Job] Expired inactive subscriptions.');
			} catch (error) {
				console.error('[Job Error] Failed to expire subscriptions:', error);
				throw error;
			}
		},
	},
	{
		name: 'Assign Support Agents to New Cases',
		slug: 'assign-support-agents',
		schedule: '0 0,6,12,18 * * *', // Runs every 6 hours
		task: async () => {
			try {
				console.log('[Job] Assigning support agents...');
				// Assignment logic
				console.log('[Job] Support agents assigned.');
			} catch (error) {
				console.error('[Job Error] Failed to assign support agents:', error);
				throw error;
			}
		},
		retries: 2,
	},
	{
		name: 'Generate Daily Reports',
		slug: 'generate-daily-reports',
		schedule: '30 3 * * *', // Runs at 3:30 AM daily
		task: async () => {
			try {
				console.log('[Job] Generating daily reports...');
				// Report generation logic
				console.log('[Job] Daily reports generated.');
			} catch (error) {
				console.error('[Job Error] Failed to generate reports:', error);
				throw error;
			}
		},
	},
	{
		name: 'Update User Status',
		slug: 'update-user-status',
		schedule: '30 0,12 * * *', // Runs every 12 hours
		task: async () => {
			try {
				console.log('[Job] Updating user statuses...');
				// Status update logic
				console.log('[Job] User statuses updated.');
			} catch (error) {
				console.error('[Job Error] Failed to update user statuses:', error);
				throw error;
			}
		},
		retries: 3,
	},
	{
		name: 'Sync External Data Sources',
		slug: 'sync-external-data',
		schedule: '0 4 * * *', // Runs at 4 AM daily
		task: async () => {
			try {
				console.log('[Job] Syncing external data sources...');
				// Data sync logic
				console.log('[Job] External data sync complete.');
			} catch (error) {
				console.error('[Job Error] Failed to sync external data:', error);
				throw error;
			}
		},
	},
	{
		name: 'Clear Old Logs and Cache',
		slug: 'clear-old-logs',
		schedule: '0 5 * * *', // Runs at 5 AM daily
		task: async () => {
			try {
				console.log('[Job] Clearing old logs and cache...');
				// Cleanup logic
				console.log('[Job] Logs and cache cleared.');
			} catch (error) {
				console.error('[Job Error] Failed to clear logs and cache:', error);
				throw error;
			}
		},
	},
];

export default jobs;
