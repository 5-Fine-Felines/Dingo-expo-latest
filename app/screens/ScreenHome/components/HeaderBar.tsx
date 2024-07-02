import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';


/* import { useNavigation } from '@react-navigation/native'; */



/* type HeaderBarNavigationProp = StackNavigationProp<RootStackParamList>; */

const HeaderBar = () => {
 /*  const navigation = useNavigation<HeaderBarNavigationProp>(); */

  return (
    <View style={{ height: 70, width: '100%' }}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* navigation.navigate(SCREENS.USERPROFILE);  */}}>
          <View style={styles.profileContainer}>
            {/* <Image source={require("../assets/images/avatar-1.png")} style={styles.profileImage} /> */}
            <Text style={styles.profileName}>Carl Jonson</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.announcementButton}>
          <Image
            style={styles.profileImage}
            /* source={require("../assets/images/icon-button-1.png")} */
          />
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
