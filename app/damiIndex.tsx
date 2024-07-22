import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const damiIndex = () => {
    const router = useRouter();
    // router.push('/screens/ScreenHome');
    return (
        <View style={styles.container}>
            <Text>damiIndex</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => router.push('/screens/ScreenHome')}>
                    <Text>Button</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ff8f8f',
        padding: 20,
    }

});

export default damiIndex