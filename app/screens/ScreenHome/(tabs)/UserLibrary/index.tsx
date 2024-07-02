import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import SearchBar from "../../components/common/SearchBar";
import { Stack } from 'expo-router'

const index = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [petName, setPetName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [note, setNote] = useState('');

const pets = [
  { id: '1', name: 'Pedro', description: 'In sit proident', /* path: require('../../assets/images/pup01.jpg') */ },
  { id: '2', name: 'Ryan', description: 'Et qui velit', /* path: require('../../assets/images/pup02.jpg')  */},                    
  { id: '3', name: 'Brian', description: 'Elit ut qui duis', /* path: require('../../assets/images/pup03.jpg') */ },
];

const contacts = [
  { id: '1', name: 'Dr. Anna Jones', specialty: 'General Practitioner', rating: 4.5, /* path: require('../../assets/images/doc1.jpeg') */ },
  { id: '2', name: 'Dr. John Smith', specialty: 'Veterinarian', rating: 4.8, /* path: require('../../assets/images/doc2.jpeg') */ },
];
  
  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  const handleAddPetPress = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    // Reset form
    setPetName('');
    setAnimalType('');
    setBreed('');
    setSex('');
    setBirthDay('');
    setNote('');
  };

const handleSubmit = () => {
  // Handle form submission
  // Add new pet to the pets array or send to backend
  console.log('New Pet:', { petName, animalType, breed, sex, birthDay, note });
  setModalVisible(false);
  // Reset form
  setPetName('');
  setAnimalType('');
  setBreed('');
  setSex('');
  setBirthDay('');
  setNote('');
};


  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown:false}} />
      <View>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
        />
        {/* Other components or content for UserHome */}
      </View>

            {/* Conversation Section */}
      <View style={styles.conversationSection}>
        <Text style={styles.sectionTitle}>Conversation</Text>
        <View style={styles.conversationContent}>
          <TouchableOpacity style={styles.conversationButton}>
            {/* <Image source={require('../../assets/images/icon-button-10.png')} style={styles.profileIcon} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.conversationButton}>
            {/* <Image source={require('../../assets/images/icon-button-101.png')} style={styles.profileIcon} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.conversationButton}>
            {/* <Image source={require('../../assets/images/icon-button-102.png')} style={styles.profileIcon} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.conversationButton}>
           {/*  <Image source={require('../../assets/images/icon-button-103.png')} style={styles.profileIcon} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.conversationButton}>
            {/* <Image source={require('../../assets/images/icon-button-104.png')} style={styles.profileIcon} /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* My Pets Section */}
      <View style={styles.petsSection}>
        <View style={styles.petsHeader}>
          <Text style={styles.sectionTitle}>My Pets</Text>
          <TouchableOpacity style={styles.addPetButton} onPress={handleAddPetPress}>
            <FontAwesome name="plus" size={16} color="white" />
            <Text style={styles.addPetButtonText}>Add My Pet</Text>
          </TouchableOpacity>
        </View>
        {pets.map(pet => (
          <TouchableOpacity key={pet.id} style={styles.petCard}>
            <Image
              source={pet.path}               /* ****************************************************Awulak Thiyenwa  */
              style={styles.petImage}
            />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petDescription}>{pet.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Last Contact Section */}
      <View style={styles.lastContactSection}>
        <Text style={styles.sectionTitle}>Last Contact</Text>
        {contacts.map(contact => (
          <TouchableOpacity key={contact.id} style={styles.doctorCard}>
            <Image
              source={contact.path}         /* ****************************************************Awulak Thiyenwa  */
              style={styles.profileIcon}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{contact.name}</Text>
              <Text style={styles.doctorSpecialty}>{contact.specialty}</Text>
            </View>
            <View style={styles.rating}>
              <FontAwesome name="star" size={16} color="black" />
              <Text style={styles.ratingText}>{contact.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        <Text style={styles.calendarTitle}>Next available today at 03:30 PM</Text>
      </View>


      {/* Add Pet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Pet</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={petName}
              onChangeText={setPetName}
            />
            <TextInput
              style={styles.input}
              placeholder="Animal Type"
              value={animalType}
              onChangeText={setAnimalType}
            />
            <TextInput
              style={styles.input}
              placeholder="Breed"
              value={breed}
              onChangeText={setBreed}
            />
            <TextInput
              style={styles.input}
              placeholder="Sex"
              value={sex}
              onChangeText={setSex}
            />
            <TextInput
              style={styles.input}
              placeholder="Birth Day"
              value={birthDay}
              onChangeText={setBirthDay}
            />
            <TextInput
              style={styles.input}
              placeholder="Note"
              value={note}
              onChangeText={setNote}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  announcementButton: {
    padding: 5,
  },
  conversationSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
  },
  conversationButton: {
    padding: 10,
  },
  petsSection: {
    marginBottom: 20,
  },
  petsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
  },
  addPetButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  petInfo: {
    marginLeft: 10,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petDescription: {
    fontSize: 14,
    color: '#666',
  },
  lastContactSection: {
    marginBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  doctorInfo: {
    marginLeft: 10,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
  calendarSection: {
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  submitButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});



export default index;