import { Client, Databases, ID } from 'appwrite';
import { client } from './client';

const databases = new Databases(client);

// Database and collection IDs
export const DATABASE_ID = 'sustainability_calculator';
export const COLLECTIONS = {
    QUIZ_RESULTS: 'quiz_results',
    LCA_REQUESTS: 'lca_requests',
    PROFILES: 'profiles',
    GLOBAL_SETTINGS: 'global_settings'
} as const;

// Initialize database and collections
export const initializeDatabase = async () => {
    try {
        console.log('Initializing Appwrite database...');
        
        // Create database if it doesn't exist
        try {
            await databases.create(DATABASE_ID, 'Sustainability Calculator');
            console.log('Database created successfully');
        } catch (error: any) {
            if (error.code !== 409) { // 409 means database already exists
                throw error;
            }
        }

        // Create quiz_results collection
        try {
            await databases.createCollection(DATABASE_ID, ID.unique(), 'Quiz Results');
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.QUIZ_RESULTS, 'user_id', 255, true);
            await databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.QUIZ_RESULTS, 'total_score', true);
            await databases.createJsonAttribute(DATABASE_ID, COLLECTIONS.QUIZ_RESULTS, 'section_scores', true);
            console.log('Quiz Results collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        // Create lca_requests collection
        try {
            await databases.createCollection(DATABASE_ID, ID.unique(), 'LCA Requests');
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.LCA_REQUESTS, 'user_id', 255, false);
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.LCA_REQUESTS, 'business_name', 255, true);
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.LCA_REQUESTS, 'contact_email', 255, true);
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.LCA_REQUESTS, 'contact_name', 255, true);
            console.log('LCA Requests collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        // Create profiles collection
        try {
            await databases.createCollection(DATABASE_ID, ID.unique(), 'Profiles');
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.PROFILES, 'id', 255, true);
            await databases.createBooleanAttribute(DATABASE_ID, COLLECTIONS.PROFILES, 'is_admin', false);
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.PROFILES, 'role', 255, true, 'user');
            console.log('Profiles collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        // Create global_settings collection
        try {
            await databases.createCollection(DATABASE_ID, ID.unique(), 'Global Settings');
            await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.GLOBAL_SETTINGS, 'key', 255, true);
            await databases.createJsonAttribute(DATABASE_ID, COLLECTIONS.GLOBAL_SETTINGS, 'value', true);
            console.log('Global Settings collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        console.log('Database initialization completed successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

// Helper function to initialize database on app start
export const initializeAppwrite = () => {
    initializeDatabase().catch(console.error);
};