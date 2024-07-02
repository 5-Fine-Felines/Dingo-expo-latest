import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Modal, Button } from 'react-native';
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import SearchBar from '@/app/screens/ScreenHome/components/SearchBar';
import HeaderBar from '@/app/screens/ScreenHome/components/HeaderBar';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';


interface Pet {
  id: string;
  name: string;
  status: string;
  /* imagePath: any; */     ///////////////////////////////Keeeeeeeeeeeeeeep eyes on thissssssssssssssss/////////////
  breed: string;
  birthday: string;
  age: string;
  vaccinationDetails: string;
  notes: string;
  vaccinations: { name: string, date: string, status: string }[];
}






const index = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [vaccinationModalVisible, setVaccinationModalVisible] = useState(false);

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





  const pets: Pet[] = [
    { 
      id: '1',
      name: 'Pedro', 
      status: 'In sit proident',
     /*  imagePath: require('../../assets/images/pup01.jpg'),  */
      breed: 'Labrador',
      birthday: '2020-01-15',
      age: '4 years',
      vaccinationDetails: 'Rabies, DHPP',
      notes: 'Friendly and energetic',
      vaccinations: [
        { name: 'Rabies', date: '2023-01-15', status: 'Vaccinated' },
        { name: 'DHPP', date: '2023-02-20', status: 'Vaccinated' },
        { name: 'Leptospirosis', date: '2024-03-20', status: 'Pending' },
      ]
    },
    { 
      id: '2', 
      name: 'Ryan', 
      status: 'Et qui velit',
      /* imagePath: require('../../assets/images/pup02.jpg'), */
      breed: 'Golden Retriever',
      birthday: '2019-06-20',
      age: '5 years',
      vaccinationDetails: 'Rabies, DHPP, Leptospirosis',
      notes: 'Loves to play fetch',
      vaccinations: [
        { name: 'Rabies', date: '2022-06-20', status: 'Vaccinated' },
        { name: 'DHPP', date: '2023-07-22', status: 'Vaccinated' },
        { name: 'Leptospirosis', date: '2024-08-01', status: 'Pending' },
      ]
    },
    { 
      id: '3', 
      name: 'Brian', 
      status: 'Elit ut qui duis',
     /*  imagePath: require('../../assets/images/pup03.jpg'), */
      breed: 'Beagle',
      birthday: '2021-08-25',
      age: '3 years',
      vaccinationDetails: 'Rabies, DHPP',
      notes: 'Curious and playful',
      vaccinations: [
        { name: 'Rabies', date: '2023-09-10', status: 'Vaccinated' },
        { name: 'DHPP', date: '2023-10-15', status: 'Vaccinated' },
      ]
    }
  ];

  const reminders = [
    { id: '1', title: 'Doctor Appointment', type: 'External' },
    { id: '2', title: 'Vaccine Reminder', type: 'External' },
  ];







  

  return (
      <View style={styles.container}>

        {/* for the components */}
        <View>
        <HeaderBar/>
          <SearchBar 
              searchText={searchText} 
              setSearchText={setSearchText} 
              handleSearch={handleSearch} 
          />
          {/* Other components or content for UserHome */}
        </View>



          <Text style={styles.heading}>My Pets</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.petCard} onPress={() => handlePetPress(item)}>

            {/* <Image source={item.imagePath} style={styles.petImage} /> */}/////////////////////////////////////////////



            <View style={styles.petTextContainer}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.petStatus}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.remindersHeading}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <View style={styles.reminderTypeContainer}>
              <Text style={styles.reminderType}>{item.type}</Text>
              <FontAwesome name="external-link" size={16} color="orange" />
            </View>
          </View>
        )}
      />

      {/* Modal for Pet Details */}
      {selectedPet && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>


              {/* <Image source={selectedPet.imagePath} style={styles.modalImage} /> */} /////////////////////////////////////////////////////////
             
             
             
              <Text style={styles.modalPetName}>{selectedPet.name}</Text>
              <Text style={styles.modalPetDetails}>Breed: {selectedPet.breed}</Text>
              <Text style={styles.modalPetDetails}>Birthday: {selectedPet.birthday}</Text>
              <Text style={styles.modalPetDetails}>Age: {selectedPet.age}</Text>
              {<Text style={styles.modalPetDetails}>Vaccination Details: {selectedPet.vaccinationDetails}</Text>}
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

      {/* Modal for Vaccination Details */}
      {selectedPet && (
        <Modal
          animationType="slide"
          transparent={true}
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
                    <Text style={styles.vaccinationText}>Vaccine Name: {item.name}</Text>
                    <Text style={styles.vaccinationText}>Date: {item.date}</Text>
                    <Text style={styles.vaccinationText}>Status: {item.status}</Text>
                  </View>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseVaccinationModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcementButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    marginHorizontal: 2,
    backgroundColor: 'white',
  },
  searchButton: {
    height: 40,
    width: 80,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 5,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  petTextContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petStatus: {
    fontSize: 14,
    color: 'gray',
  },
  remindersHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 5,
  },
  reminderTitle: {
    fontSize: 16,
  },
  reminderTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderType: {
    fontSize: 14,
    color: 'gray',
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalPetName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalPetDetails: {
    fontSize: 16,
    marginBottom: 4,
  },
  vaccinationButton: {
    marginTop: 10,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  vaccinationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vaccinationItem: {
    marginBottom: 8,
  },
  vaccinationText: {
    fontSize: 16,
  },
});

export default index;