import React from 'react';
import { Client, Databases, ID, Models } from 'appwrite';

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
        // Create Quiz Results Collection
        await databases.create(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'Quiz Results Collection',
            ['role:all'],
            ['role:all']
        );

        // Create Quiz Results Attributes
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'user_id',
            255,
            true
        );
        await databases.createIntegerAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'total_score',
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'section_scores',
            65535, // Using a large text field for JSON data
            true
        );

        // Create LCA Requests Collection
        await databases.create(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'LCA Requests Collection',
            ['role:all'],
            ['role:all']
        );

        // Create LCA Requests Attributes
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'user_id',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'business_name',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'contact_email',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.LCA_REQUESTS,
            'contact_name',
            255,
            true
        );

        // Create Profiles Collection
        await databases.create(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'User Profiles Collection',
            ['role:all'],
            ['role:all']
        );

        // Create Profiles Attributes
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'user_id',
            255,
            true
        );
        await databases.createBooleanAttribute(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'is_admin',
            false
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            'role',
            255,
            true,
            'user'
        );

        // Create Global Settings Collection
        await databases.create(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'Global Settings Collection',
            ['role:all'],
            ['role:all']
        );

        // Create Global Settings Attributes
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'key',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'value',
            65535, // Using a large text field for JSON data
            true
        );

        console.log('All collections and attributes created successfully');

    } catch (error: any) {
        // Handle specific error codes
        if (error.code === 409) {
            console.log('Some collections or attributes already exist, continuing...');
        } else {
            console.error('Error setting up collections:', error);
            throw error;
        }
    }
};

// Setup component
export const SchemaSetup: React.FC = () => {
    const handleSetupClick = async () => {
        try {
            await setupCollectionSchemas();
            console.log('Schema setup completed');
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