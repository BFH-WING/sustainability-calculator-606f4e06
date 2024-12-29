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
        // Quiz Results Collection
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
        await databases.createJsonAttribute(
            DATABASE_ID,
            COLLECTIONS.QUIZ_RESULTS,
            'section_scores',
            true
        );
        console.log('Quiz Results schema created successfully');

        // LCA Requests Collection
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
        console.log('LCA Requests schema created successfully');

        // Profiles Collection
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
        console.log('Profiles schema created successfully');

        // Global Settings Collection
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'key',
            255,
            true
        );
        await databases.createJsonAttribute(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'value',
            true
        );
        console.log('Global Settings schema created successfully');

    } catch (error) {
        console.error('Error setting up collection schemas:', error);
        throw error;
    }
};

// Create a setup component to initialize the schemas
export const SchemaSetup = () => {
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