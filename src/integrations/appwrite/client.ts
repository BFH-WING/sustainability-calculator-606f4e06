import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://api.bitspark.ch/v1')
    .setProject('677168fb0027e7ff582f');

export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection IDs
export const DATABASE_ID = 'sustainability_calculator';
export const COLLECTIONS = {
    GLOBAL_SETTINGS: 'global_settings',
    LCA_REQUESTS: 'lca_requests'
} as const;