import React from 'react';
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://api.bitspark.ch/v1')
    .setProject('677168fb0027e7ff582f');

const databases = new Databases(client);
const DATABASE_ID = 'sustainability_calculator';

// Collection IDs
export const COLLECTIONS = {
    QUIZ_RESULTS: 'quiz_results',
    LCA_REQUESTS: 'lca_requests',
    PROFILES: 'profiles',
    GLOBAL_SETTINGS: 'global_settings'
} as const;

export const setupCollectionSchemas = async () => {
    console.log('Setting up Appwrite collection schemas...');

    try {
        // Create collections first
        for (const [name, id] of Object.entries(COLLECTIONS)) {
            try {
                await databases.createCollection(
                    DATABASE_ID,
                    id,
                    name
                );
                console.log(`Created collection: ${name}`);
            } catch (error: any) {
                if (error.code !== 409) { // Skip if collection already exists
                    throw error;
                }
                console.log(`Collection ${name} already exists`);
            }
        }

        // Quiz Results Collection Attributes
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'user_id',
            'string',
            255,
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'total_score',
            'integer',
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'section_scores',
            'string',
            true
        );
        console.log('Quiz Results schema created successfully');

        // LCA Requests Collection Attributes
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'user_id',
            'string',
            255,
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'business_name',
            'string',
            255,
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'contact_email',
            'string',
            255,
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'contact_name',
            'string',
            255,
            true
        );
        console.log('LCA Requests schema created successfully');

        // Profiles Collection Attributes
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'user_id',
            'string',
            255,
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'is_admin',
            'boolean',
            false
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'role',
            'string',
            255,
            true,
            'user'
        );
        console.log('Profiles schema created successfully');

        // Global Settings Collection Attributes
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'key',
            'string',
            255,
            true
        );
        await databases.createAttribute(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'value',
            'string',
            true
        );
        console.log('Global Settings schema created successfully');

    } catch (error) {
        console.error('Error setting up collection schemas:', error);
        throw error;
    }
};

export const SchemaSetup: React.FC = () => {
    const handleSetupClick = async () => {
        try {
            await setupCollectionSchemas();
            console.log('All schemas created successfully');
        } catch (error) {
            console.error('Failed to set up schemas:', error);
        }
    };

    return (
        <button 
            onClick={handleSetupClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Setup Database Schemas
        </button>
    );
};