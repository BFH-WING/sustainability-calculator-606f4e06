import { account } from '@/integrations/appwrite/client';

export const checkIsAdmin = async (): Promise<boolean> => {
  try {
    console.log('Checking admin status...');
    const user = await account.get();
    const labels = user.labels || [];
    const isAdmin = labels.includes('admin');
    console.log('Admin check result:', isAdmin);
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};