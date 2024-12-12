import React, { useState, useEffect } from 'react';
import { useRouter, Slot, usePathname } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const pathNames = {
  LATESTNEWS: '/screens/ScreenHome/(tabs)/UserFeed/(tabs)/LatestNewsTab',
  VETERINARY: '/screens/ScreenHome/(tabs)/UserFeed/(tabs)/VeterinaryTab',
  MISSING: '/screens/ScreenHome/(tabs)/UserFeed/(tabs)/MissingTab',
};

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>(pathNames.LATESTNEWS);

  useEffect(() => {
    if (pathname !== pathNames.LATESTNEWS) {
      setActivePath(pathNames.LATESTNEWS);
      router.push(pathNames.LATESTNEWS);
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
          style={activePath === pathNames.LATESTNEWS ? [styles.link, styles.activeLink] : styles.link}
          onPress={() => handlePress(pathNames.LATESTNEWS)}
        >
          <Text style={activePath === pathNames.LATESTNEWS ? styles.activeText : styles.inactiveText}>
            Latest News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activePath === pathNames.VETERINARY ? [styles.link, styles.activeLink] : styles.link}
          onPress={() => handlePress(pathNames.VETERINARY)}
        >
          <Text style={activePath === pathNames.VETERINARY ? styles.activeText : styles.inactiveText}>
            Veterinary Medical
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activePath === pathNames.MISSING ? [styles.link, styles.activeLink] : styles.link}
          onPress={() => handlePress(pathNames.MISSING)}
        >
          <Text style={activePath === pathNames.MISSING ? styles.activeText : styles.inactiveText}>
            Missing
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
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeLink: {
    backgroundColor: 'rgb(255, 254, 205)',
    borderRadius: 20,
  },
  activeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inactiveText: {
    fontSize: 14,
    color: '#5e5e5e', // Inactive text color
  },
  content: {
    flex: 1,
  },
});
