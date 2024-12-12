import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import IMAGES from "@/assets/images";
import HeaderBar from "../components/common/HeaderBar";



export default function TabLayout() {
    return (
        <View style={{ flex:1}}>
            <HeaderBar />
           
        <Tabs
            initialRouteName="UserHome"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarIconStyle: {
                    width: 50,
                    height: 20,
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    height: 68,
                    paddingHorizontal: 26,
                    backgroundColor: '#ff8c00',
                },
            }}
        >
            <Tabs.Screen
                name="UserHome"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={IMAGES.NAVHOME} 
                            style={[styles.icon, focused && styles.iconFocused]} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserSearch"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={IMAGES.NAVSEARCH} 
                            style={[styles.icon, focused && styles.iconFocused]} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserFeed"
                options={{
                    title: 'Feed',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={IMAGES.NAVFEED} 
                            style={[styles.icon, focused && styles.iconFocused]} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserLibrary"
                options={{
                    title: 'Library',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={IMAGES.NAVLIBRARY} 
                            style={[styles.icon, focused && styles.iconFocused]} 
                        />
                    ),
                }}
            />
        </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 28, // Adjust as needed
        height: 28, // Adjust as needed
        opacity: 0.4, // Default opacity for inactive tabs
    },
    iconFocused: {
        opacity: 1, // Full opacity for active tabs
    },
});
