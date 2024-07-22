import React, { useEffect, useState } from 'react';
import { Link, Slot, usePathname } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';

const pathNames = {
  LATESTUPDATE: '/screens/ScreenHome/(tabs)/UserSearch/(tabs)/LatestUpdateTab',
  CATEGORY: '/screens/ScreenHome/(tabs)/UserSearch/(tabs)/CategoryTab',
  PRODUCT: '/screens/ScreenHome/(tabs)/UserSearch/(tabs)/ProductTab',
};

export default function Layout() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathNames.LATESTUPDATE);
  console.log(activePath);
  

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Link 
          style={activePath === pathNames.LATESTUPDATE ? [styles.link, styles.activeLink] : styles.link}
          href={pathNames.LATESTUPDATE}
        >
          <Text style={activePath === pathNames.LATESTUPDATE ? styles.activeText : styles.inactiveText}>
            Latest Update
          </Text>
        </Link>
        <Link 
          style={activePath === pathNames.CATEGORY ? [styles.link, styles.activeLink] : styles.link}
          href={pathNames.CATEGORY}
        >
          <Text style={activePath === pathNames.CATEGORY ? styles.activeText : styles.inactiveText}>
            Category
          </Text>
        </Link>
        <Link 
          style={activePath === pathNames.PRODUCT ? [styles.link, styles.activeLink] : styles.link}
          href={pathNames.PRODUCT}
        >
          <Text style={activePath === pathNames.PRODUCT ? styles.activeText : styles.inactiveText}>
            Products
          </Text>
        </Link>
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  link: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:"red",
  },
  activeLink: {
    borderBottomWidth: 2,
    borderBottomColor: '#8b0000', // Active tab border color
    backgroundColor:"yellow",
  },
  activeText: {
    fontSize: 18,
    color: '#ff0e0e', // Active text color
    fontWeight: 'bold',
  },
  inactiveText: {
    fontSize: 16,
    color: '#5e5e5e', // Inactive text color
  },
  content: {
    flex: 1,
  },
});
