import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import SearchBar from '../../components/common/SearchBar';
import { FontAwesome } from '@expo/vector-icons';
import fetchPetsData from '@/app/functions/petOption/getownerpet';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import getReminders from '@/app/functions/reminderOption/getreminder';

interface Vaccination {
  name: string;
  date: string;
  status: string;
}

interface Pet {
  id: string;
  name: string;
  status: string;
  breed: string;
  birthday: string;
  age: string;
  vaccinationDetails: string;
  notes: string;
  vaccinations: Vaccination[];
}

interface Reminder {
  remid: number;
  created_at: string;
  remtitle: string;
  remtype: string;
  remcalanderlink: string;
  userid: string;
  petid: string;
}

const Index = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [vaccinationModalVisible, setVaccinationModalVisible] = useState(false);
  const [myPetsData, setMyPetsData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [remindersLoading, setRemindersLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setRemindersLoading(true);

      const [pets, remindersData] = await Promise.all([fetchPetsData(), getReminders()]);

      setMyPetsData(pets);
      setReminders(remindersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRemindersLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };

  const handlePetPress = (pet: Pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  const handleVaccinationPress = () => {
    setVaccinationModalVisible(true);
  };

  const handleCloseVaccinationModal = () => {
    setVaccinationModalVisible(false);
  };

  const renderPetSkeleton = () => (
    <ContentLoader viewBox="0 0 400 100">
      <Circle cx="50" cy="50" r="30" />
      <Rect x="100" y="20" rx="4" ry="4" width="250" height="13" />
      <Rect x="100" y="40" rx="3" ry="3" width="200" height="10" />
      <Rect x="100" y="60" rx="3" ry="3" width="150" height="10" />
    </ContentLoader>
  );

  const renderReminderSkeleton = () => (
    <ContentLoader viewBox="0 0 400 50">
      <Rect x="0" y="0" rx="5" ry="5" width="400" height="50" />
      <Rect x="0" y="60" rx="5" ry="5" width="400" height="50" />
      <Rect x="0" y="120" rx="5" ry="5" width="400" height="50" />
    </ContentLoader>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View>
          <SearchBar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
        </View>

        <Text style={styles.heading}>My Pets</Text>
        {loading ? (
          renderPetSkeleton()
        ) : myPetsData.length === 0 ? (
          <Text style={styles.noPetsText}>No Pet to show, add some pet</Text>
        ) : (
          <FlatList
            data={myPetsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.petCard} onPress={() => handlePetPress(item)}>
                <View style={styles.petTextContainer}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petStatus}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        )}

        <Text style={styles.remindersHeading}>Reminders</Text>
        {remindersLoading ? (
          renderReminderSkeleton()
        ) : reminders.length === 0 ? (
          <Text style={styles.noPetsText}>No reminders to show, add some reminders</Text>
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.remid.toString()}
            renderItem={({ item }) => (
              <View style={styles.reminderItem}>
                <Text style={styles.reminderTitle}>{item.remtitle}</Text>
                <View style={styles.reminderTypeContainer}>
                  <Text style={styles.reminderType}>{item.remtype}</Text>
                  <FontAwesome name="external-link" size={16} color="orange" />
                </View>
              </View>
            )}
            scrollEnabled={false}
          />
        )}

        {selectedPet && (
          <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={handleCloseModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalPetName}>{selectedPet.name}</Text>
                <Text style={styles.modalPetDetails}>Breed: {selectedPet.breed}</Text>
                <Text style={styles.modalPetDetails}>Birthday: {selectedPet.birthday}</Text>
                <Text style={styles.modalPetDetails}>Age: {selectedPet.age}</Text>
                <Text style={styles.modalPetDetails}>Vaccination Details: {selectedPet.vaccinationDetails}</Text>
                <Text style={styles.modalPetDetails}>Notes: {selectedPet.notes}</Text>
                <TouchableOpacity style={styles.vaccinationButton} onPress={handleVaccinationPress}>
                  <Text style={styles.vaccinationButtonText}>Vaccination</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {selectedPet && (
          <Modal
            animationType="slide"
            transparent
            visible={vaccinationModalVisible}
            onRequestClose={handleCloseVaccinationModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeading}>Vaccination Details</Text>
                <FlatList
                  data={selectedPet.vaccinations}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.vaccinationItem}>
                      <Text style={styles.vaccinationText}>{item.name}</Text>
                      <Text style={styles.vaccinationText}>{item.date}</Text>
                      <Text style={styles.vaccinationText}>{item.status}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                />
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseVaccinationModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
  },
  petTextContainer: {
    marginLeft: 16,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  petStatus: {
    fontSize: 14,
    color: "gray",
  },
  noPetsText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  remindersHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  reminderItem: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reminderTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  reminderType: {
    fontSize: 14,
    color: "gray",
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalPetName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalPetDetails: {
    fontSize: 16,
    marginBottom: 8,
  },
  vaccinationButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "orange",
    borderRadius: 8,
  },
  vaccinationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "gray",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vaccinationItem: {
    marginBottom: 8,
  },
  vaccinationText: {
    fontSize: 16,
  },
});

export default Index;
