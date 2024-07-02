import { Tabs } from "expo-router";
import React from "react";
import { Image } from "expo-image"

export default function TabLayout() {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
                <Image source={require("../../../../assets/images/home.png")} />),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ focused }) => (
                <Image source={require("../../../../assets/images/search2.png")} />
            ),
          }}
        />
        <Tabs.Screen
          name="feed"
          options={{
            title: 'Feed',
            tabBarIcon: ({ focused }) => (
                <Image source={require("../../../../assets/images/playlist.png")} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ focused }) => (
                <Image source={require("../../../../assets/images/books.png")} />
            ),
          }}
        />
      </Tabs>
    );
  }