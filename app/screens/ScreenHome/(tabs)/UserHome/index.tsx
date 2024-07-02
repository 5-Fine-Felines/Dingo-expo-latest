import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import SearchBar from '@/app/screens/ScreenHome/components/SearchBar';
import HeaderBar from '@/app/screens/ScreenHome/components/HeaderBar';

const index = () => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = () => {
      console.log('Searching for:', searchText);
  };

  return (
      <View style={styles.container}>
        <HeaderBar/>
          <SearchBar 
              searchText={searchText} 
              setSearchText={setSearchText} 
              handleSearch={handleSearch} 
          />
          {/* Other components or content for UserHome */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
  },
});

export default index;