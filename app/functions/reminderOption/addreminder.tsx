import { supabase } from "@/app/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserId = async (): Promise<string | null> => {
  try {
    const userInfoJSON = await AsyncStorage.getItem('user');
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON);
      return userInfo.id; // assuming 'id' is the key for user ID
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const insertReminder = async (reminder: {
  remtitle: string;
  remtype: string;
  remcalanderlink: string;
  expectdate: string;
  expecttime: string;
  userid: string;
//   petid: string;
}) => {
  const { data, error } = await supabase
    .from('pet_reminders')
    .insert([reminder])
    .select();

  if (error) {
    throw error;
  }
  return data;
};
