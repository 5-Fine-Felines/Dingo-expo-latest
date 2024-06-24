import { Slot } from 'expo-router'
import { View, Text } from 'react-native'


const RootLayout = () => {
  return (
    <View className='relative w-full flex-1'>
      <Slot />
    </View>
  )
}

export default RootLayout