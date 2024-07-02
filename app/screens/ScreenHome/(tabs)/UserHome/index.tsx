import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import SearchBar from '../../components/common/SearchBar';




const index = () => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = () => {
      console.log('Searching for:', searchText);
  };

  return (

    <View>
      <Stack.Screen options={{ headerShown:false}} />
      <SearchBar 
              searchText={searchText} 
              setSearchText={setSearchText} 
              handleSearch={handleSearch} 
          />
      <Text>index</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
  },
});


export default index;