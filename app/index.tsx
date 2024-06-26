import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { supabase } from './lib/supabase';
import signin from './functions/auth/signin';

interface UserData {
  id: string;
  email: string;
  last_signin: Date;
  pictureurl: string;
}


const index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignin = async () => {
    const result = await signin();
    if ('error' in result) {
      setError(result.error || 'Unknown error occurred');
    } else {
      setUserData(result);
      setError(null);
    }
    console.log('User data:', result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>index</Text>
      <TouchableOpacity onPress={handleSignin}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Click</Text>
        </View>
      </TouchableOpacity>
      {userData ? (
        <View>
          <Text>ID: {userData.id}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Last Sign-in: {userData.last_signin.toString()}</Text>
          <Text>Picture URL: {userData.pictureurl}</Text>
        </View>
      ) : (
        <Text>No user data</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  title: {
    fontSize: 20,
    color: 'red',
  },
  button: {
    width: 128,
    backgroundColor: 'blue',
    padding: 8,
    justifyContent: 'center',
    margin: 'auto',
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
});

export default index