import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Modal, View, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getUserId, insertReminder } from '@/app/functions/reminderOption/addreminder';
import { Picker } from '@react-native-picker/picker';

interface ReminderButtonProps {
  pets: { id: string; name: string }[]; // Prop to accept list of pets
}

const ReminderButton: React.FC<ReminderButtonProps> = ({ pets }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('normal');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [petId, setPetId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = async () => {
    const userId = await getUserId();
    if (!userId) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    try {
      const reminder = {
        remtitle: title,
        remtype: type,
        remcalanderlink: '', // Assuming there's no calendar link provided in the form
        expectdate: date.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        expecttime: time.toISOString().split('T')[1].split('.')[0], // Convert to HH:MM:SS format
        userid: userId,
        // petid: petId,
      };
      console.log(petId);
      const data = await insertReminder(reminder);
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setModalVisible(false);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const logPetId = (pet:any) => {
    console.log(pet.id);
  };
  
  pets.map(logPetId);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Add Reminder</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Title:</Text>
            <TextInput value={title} onChangeText={setTitle} style={{ borderBottomWidth: 1, marginBottom: 10 }} />

            <Text>Type:</Text>
            <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} style={{ marginBottom: 10 }}>
              <Picker.Item label="Urgent" value="urgent" />
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Immediate" value="immediate" />
              <Picker.Item label="One Time" value="one_time" />
            </Picker>

            <Text onPress={() => setShowDatePicker(true)} style={{ marginBottom: 10 }}>
              Date: {date.toDateString()}
            </Text>
            {showDatePicker && (
              <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
            )}

            <Text onPress={() => setShowTimePicker(true)} style={{ marginBottom: 10 }}>
              Time: {time.toLocaleTimeString()}
            </Text>
            {showTimePicker && (
              <DateTimePicker value={time} mode="time" display="default" onChange={onChangeTime} />
            )}

            <Text>Pet Name:</Text>
            <Picker selectedValue={petId} onValueChange={(itemValue) => setPetId(itemValue)} style={{ marginBottom: 10 }}>
              {pets.map((pet) => (
                <Picker.Item key={pet.id} label={pet.name} value={pet.id} />
              ))}
            </Picker>

            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReminderButton;
