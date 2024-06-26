import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { supabase } from './lib/supabase';
import signin from './functions/auth/signin';

const index = () => {
  const [clist, setclist] = useState([]);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      console.log('fetching.....');

      let { data: user, error } = await supabase
        .from('user')
        .select('*');
        console.log(user);

    };
    // fetchList();
  });

  

  const handleSignin = async () => {
    const result = await signin();
    if (result) {
      setError(result);
    } else {
      setUserData(result);
      setError(null);
    }
    console.log('User data:', result);
  };

  return (
    <View className='flex-1 m-auto justify-center'>
      <Text className='text-xl text-red-700'>index</Text>
      <TouchableOpacity onPress={() => {
        handleSignin();
        console.log('press');

      }}>
        <View className='w-32 bg-blue-300 p-2 justify-center m-auto rounded'>
          <Text className='m-auto'>Click</Text>
        </View>
      </TouchableOpacity>
      <Text>{userData}</Text>
      

    </View>
  )
}

export default index