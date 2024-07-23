// addpost.tsx
import { supabase } from '@/app/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addPost = async (thought: string, imageLinks: string[]) => {
  try {
    const userInfoJSON = await AsyncStorage.getItem('user');
    if (!userInfoJSON) throw new Error('User not logged in');

    const userInfo = JSON.parse(userInfoJSON);
    const { id: userId, name: username } = userInfo;

    const { data, error } = await supabase
      .from('latestnews')
      .insert([
        { ncontent: thought, imgurla: imageLinks[0], imgurlb: imageLinks[1], imgurlc: imageLinks[2], uname: username, nuid: userId },
      ])
      .select();

    if (error) throw error;

    console.log('Post added successfully:', data);
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export default addPost;
