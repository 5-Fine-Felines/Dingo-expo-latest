import { View, Text, TouchableOpacity, StyleSheet, Button, Image, Alert } from 'react-native'
import onGoogleButtonPress from './functions/auth/signin2';
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type UserInfo = {
  email: string;
  name: string | null;
  id: string;
  photo: string | null;
};

const index = () => {

  const [user, setUser] = useState<UserInfo | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const UserInfo = await onGoogleButtonPress();
      setUser(UserInfo.user);
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const handleSignout = async() => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('Sign out error: ', error);

    }
  }




  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>index</Text>
      <TouchableOpacity onPress={() => {
        // _sigIn();
      }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Click</Text>
        </View>
      </TouchableOpacity>
      <View>
      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Text>Name: {user.name}</Text>
          <Text>ID: {user.id}</Text>
          {user.photo && <Image source={{ uri: user.photo }} style={{ width: 100, height: 100 }} />}
        </>
      ) : (
        <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
        
      )}
      <Button title='Signout' onPress={handleSignout} />
    </View>
      
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