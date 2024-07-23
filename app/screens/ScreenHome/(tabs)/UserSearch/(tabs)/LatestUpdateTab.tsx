import { getLatestUpdates, LatestUpdate } from '@/app/functions/SearchTabOption/getlatestupdate';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';


export default function LatestUpdateTab() {
  const [latestUpdates, setLatestUpdates] = useState<LatestUpdate[]>([]);
  const [selectedUpdate, setSelectedUpdate] = useState<LatestUpdate | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const data : any = await getLatestUpdates();
      setLatestUpdates(data);
      console.log(data);
    }
    fetchData();
  }, []);

  const openModal = (update: LatestUpdate) => {
    setSelectedUpdate(update);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUpdate(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Explore</Text>
    <ScrollView>
      {latestUpdates.map((update) => (
        <TouchableOpacity key={update.luid} style={styles.card} onPress={() => openModal(update)}>
          <Image source={update.luimageurl} style={styles.image} contentFit="cover"/>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{update.lutitle}</Text>
            <Text style={styles.author}>{update.luauthor}</Text>
            <Text style={styles.date}>{formatDate(update.created_at)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {selectedUpdate && (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Image source={selectedUpdate.luimageurl} style={styles.simage} contentFit="cover"/>
            <Text style={styles.modalTitle}>{selectedUpdate.lutitle}</Text>
            <Text style={styles.modalAuthor}>By {selectedUpdate.luauthor}</Text>
            <Text style={styles.modalDate}>{formatDate(selectedUpdate.created_at)}</Text>
            <Text style={styles.modalText}>{selectedUpdate.ludescription}</Text>
            <Button color={'orange'} title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  simage:{
    width: '100%',
    height: 200,
    borderRadius:10,

  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  modalDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
});