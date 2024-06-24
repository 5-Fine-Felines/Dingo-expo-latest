import { View, Text, TouchableOpacity } from 'react-native'

const index = () => {
  return (
    <View className='flex-1 m-auto justify-center'>
      <Text className='text-xl text-red-700'>index</Text>
      <TouchableOpacity>
        <View className='w-32 bg-blue-300 p-2 justify-center m-auto rounded'>
          <Text className='m-auto'>Click</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default index