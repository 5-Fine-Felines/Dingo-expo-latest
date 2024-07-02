import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserInfo = {
  email: string;
  name: string | null;
  id: string;
  photo: string | null;

};


const HeaderBar = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storeUserInfo = async () => {
      const userInfoJSON = await AsyncStorage.getItem('user');
      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);
        // Handle the user info (e.g., set it to state)
        setUser(userInfo);
        console.log(userInfo); // Replace this with your state-setting logic
      } else {
        console.log('No user info found in storage.');
        
      }
    };
    storeUserInfo();
}, []);

 


  return (
    <View style={{ height: 70, width: '100%', marginTop: 30, padding: 10 }}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* navigation.navigate(SCREENS.USERPROFILE);  */ }}>
          <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={user?.photo
              ? { uri: user.photo }
              : require("../../../../../assets/images/avatar-1.png")}
          />
            
            <Text style={styles.profileName}>{user?.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.announcementButton}>
        <Image source={require("../../../../../assets/images/icon-button-1.png")} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileContainer: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcementButton: {
    padding: 0,
  },

});

export default HeaderBar;
