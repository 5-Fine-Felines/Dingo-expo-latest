import { supabase } from '@/app/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Adjust this import based on your project structure

interface Reminder {
    remid: number;
    created_at: string;
    remtitle: string;
    remtype: string;
    remcalanderlink: string;
    userid: string;
    petid: string;
}

const getReminders = async (): Promise<Reminder[]> => {
    try {
        const userInfoJSON = await AsyncStorage.getItem('user');
        if (userInfoJSON) {
            const userInfo = JSON.parse(userInfoJSON);
            const userId = userInfo.id; // assuming 'id' is the key for user ID
            if (userId) {
                const { data: pet_reminders, error } = await supabase
                    .from('pet_reminders')
                    .select('*')
                    .eq('userid', userId);

                if (error) {
                    throw error;
                }
                console.log(pet_reminders);
                console.log(userId);

                return pet_reminders || [];
            } else {
                throw new Error('User ID not found in AsyncStorage');
            }
        } else {
            throw new Error('User info not found in AsyncStorage');
        }
    } catch (error) {
        console.error('Error fetching reminders:', error);
        return [];
    }
};

export default getReminders;
