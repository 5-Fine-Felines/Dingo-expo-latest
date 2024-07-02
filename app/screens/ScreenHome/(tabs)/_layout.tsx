import { Tabs } from "expo-router";
import React from "react";
import { Image } from "expo-image"
import IMAGES from "@/assets/images";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'blue', 
            tabBarShowLabel: false, 
            tabBarStyle: {
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                height: 72,
                paddingHorizontal: 36,
                backgroundColor: '#ff8c00',
            }
        }}>
            <Tabs.Screen
                name="UserHome"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.NAVHOME} />),
                }}
            />
            <Tabs.Screen
                name="UserSearch"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.NAVSEARCH} />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserFeed"
                options={{
                    title: 'Feed',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.NAVFEED} />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserLibrary"
                options={{
                    title: 'Library',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.NAVLIBRARY} />
                    ),
                }}
            />
        </Tabs>
    );
}