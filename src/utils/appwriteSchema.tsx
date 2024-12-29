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
        // Create collections
        await databases.createDocument(
            DATABASE_ID,
            ID.unique(),
            COLLECTIONS.QUIZ_RESULTS,
            {
                name: 'Quiz Results',
                permissions: ['role:all'],
                documentSecurity: false
            }
        );

        await databases.createDocument(
            DATABASE_ID,
            ID.unique(),
            COLLECTIONS.LCA_REQUESTS,
            {
                name: 'LCA Requests',
                permissions: ['role:all'],
                documentSecurity: false
            }
        );

        await databases.createDocument(
            DATABASE_ID,
            ID.unique(),
            COLLECTIONS.PROFILES,
            {
                name: 'User Profiles',
                permissions: ['role:all'],
                documentSecurity: false
            }
        );

        await databases.createDocument(
            DATABASE_ID,
            ID.unique(),
            COLLECTIONS.GLOBAL_SETTINGS,
            {
                name: 'Global Settings',
                permissions: ['role:all'],
                documentSecurity: false
            }
        );

        // Create attributes for each collection
        const collections = [
            {
                id: COLLECTIONS.QUIZ_RESULTS,
                attributes: [
                    { key: 'user_id', type: 'string', size: 255, required: true },
                    { key: 'total_score', type: 'integer', required: true },
                    { key: 'section_scores', type: 'string', size: 65535, required: true }
                ]
            },
            {
                id: COLLECTIONS.LCA_REQUESTS,
                attributes: [
                    { key: 'user_id', type: 'string', size: 255, required: true },
                    { key: 'business_name', type: 'string', size: 255, required: true },
                    { key: 'contact_email', type: 'string', size: 255, required: true },
                    { key: 'contact_name', type: 'string', size: 255, required: true }
                ]
            },
            {
                id: COLLECTIONS.PROFILES,
                attributes: [
                    { key: 'user_id', type: 'string', size: 255, required: true },
                    { key: 'is_admin', type: 'boolean', required: true },
                    { key: 'role', type: 'string', size: 255, required: true }
                ]
            },
            {
                id: COLLECTIONS.GLOBAL_SETTINGS,
                attributes: [
                    { key: 'key', type: 'string', size: 255, required: true },
                    { key: 'value', type: 'string', size: 65535, required: true }
                ]
            }
        ];

        for (const collection of collections) {
            for (const attr of collection.attributes) {
                await databases.createDocument(
                    DATABASE_ID,
                    collection.id,
                    ID.unique(),
                    {
                        attributeName: attr.key,
                        type: attr.type,
                        size: attr.size,
                        required: attr.required
                    }
                );
            }
        }

        console.log('All collections and attributes created successfully');
    } catch (error: any) {
        if (error.code === 409) {
            console.log('Some collections or attributes already exist, continuing...');
        } else {
            console.error('Error setting up collections:', error);
            throw error;
        }
    }
};

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