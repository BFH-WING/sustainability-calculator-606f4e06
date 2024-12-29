import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://api.bitspark.ch/v1')
    .setProject('677168fb0027e7ff582f');

export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection IDs - you'll need to create these in Appwrite Console
export const DATABASE_ID = 'sustainability_calculator';
export const COLLECTIONS = {
    QUIZ_RESULTS: 'quiz_results',
    LCA_REQUESTS: 'lca_requests',
    PROFILES: 'profiles',
    GLOBAL_SETTINGS: 'global_settings'
} as const;