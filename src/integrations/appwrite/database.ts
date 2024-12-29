import { Client, Databases, ID } from 'appwrite';
import { account, databases } from './client';

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
        
        // Create collections if they don't exist
        try {
            await databases.createCollection(
                DATABASE_ID,
                ID.unique(),
                'Quiz Results',
                'Stores quiz results for users'
            );
            console.log('Quiz Results collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        try {
            await databases.createCollection(
                DATABASE_ID,
                ID.unique(),
                'LCA Requests',
                'Stores LCA requests from users'
            );
            console.log('LCA Requests collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        try {
            await databases.createCollection(
                DATABASE_ID,
                ID.unique(),
                'Profiles',
                'Stores user profiles'
            );
            console.log('Profiles collection created');
        } catch (error: any) {
            if (error.code !== 409) throw error;
        }

        try {
            await databases.createCollection(
                DATABASE_ID,
                ID.unique(),
                'Global Settings',
                'Stores application settings'
            );
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