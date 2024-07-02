import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HeaderBar from '@/app/screens/ScreenHome/components/HeaderBar';

const index = () => {
  return (
    <View>
      <HeaderBar />
      <Stack.Screen options={{ headerShown:false}} />
      <Text>index</Text>
    </View>
  )
}

export default index