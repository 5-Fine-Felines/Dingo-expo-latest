import React, { useState, useEffect } from 'react';
import { useRouter, Slot, usePathname } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const pathNames = {
  LATESTUPDATE: '/screens/ScreenHome/(tabs)/UserSearch/(tabs)/LatestUpdateTab',
  CATEGORY: '/screens/ScreenHome/(tabs)/UserSearch/(tabs)/CategoryTab',
  PRODUCT: '/screens/ScreenHome/(tabs)/UserSearch/(tabs)/ProductTab',
};

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>(pathNames.LATESTUPDATE);

  useEffect(() => {
    if (pathname !== pathNames.LATESTUPDATE) {
      setActivePath(pathNames.LATESTUPDATE);
      router.push(pathNames.LATESTUPDATE);
    }
  }, []);

  const handlePress = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={activePath === pathNames.LATESTUPDATE ? [styles.link, styles.activeLink] : styles.link}
          onPress={() => handlePress(pathNames.LATESTUPDATE)}
        >
          <Text style={activePath === pathNames.LATESTUPDATE ? styles.activeText : styles.inactiveText}>
            Latest Update
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activePath === pathNames.CATEGORY ? [styles.link, styles.activeLink] : styles.link}
          onPress={() => handlePress(pathNames.CATEGORY)}
        >
          <Text style={activePath === pathNames.CATEGORY ? styles.activeText : styles.inactiveText}>
            Category
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activePath === pathNames.PRODUCT ? [styles.link, styles.activeLink] : styles.link}
          onPress={() => handlePress(pathNames.PRODUCT)}
        >
          <Text style={activePath === pathNames.PRODUCT ? styles.activeText : styles.inactiveText}>
            Products
          </Text>
        </TouchableOpacity>
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
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  link: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeLink: {
    backgroundColor: 'rgb(255, 254, 205)',
    borderRadius: 20,
  },
  activeText: {
    fontSize: 17,
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
