// NewsFeed.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import getlatestnews, { LatestNews } from '@/app/functions/FeedTabOption/getlatestnews';
import AddThought from './ExtraComponent/AddThought';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function NewsFeed() {
  const [news, setNews] = useState<LatestNews[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Fetch the latest news data
  const fetchData = async () => {
    const latestNews = await getlatestnews();
    setNews(latestNews);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh control handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Render images based on the number of images present
  const renderImages = (images: string[]) => {
    switch (images.length) {
      case 1:
        return (
          <Image
            key={0}
            source={{ uri: images[0] }}
            style={styles.singleImage}
          />
        );
      case 2:
        return images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.twoImages}
          />
        ));
      case 3:
        return images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.threeImages}
          />
        ));
      default:
        return null;
    }
  };

  // Render individual news items
  const renderItem = ({ item }: { item: LatestNews }) => {
    const images: any = [item.imgurla, item.imgurlb, item.imgurlc].filter(Boolean);

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.username}>{item.uname}</Text>
          <Text style={styles.date}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.content}>{item.ncontent}</Text>
        {images.length > 0 && (
          <View style={styles.imageContainer}>{renderImages(images)}</View>
        )}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.root}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headertext}>Latest Updates</Text>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.lnid.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <AddThought />

      </View>
    </SafeAreaView>
    </GestureHandlerRootView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  headertext: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 14
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#888',
    fontSize: 14,
  },
  content: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  singleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  twoImages: {
    width: '48%',
    height: 150,
    borderRadius: 8,
  },
  threeImages: {
    width: '32%',
    height: 100,
    borderRadius: 8,
  },
});
