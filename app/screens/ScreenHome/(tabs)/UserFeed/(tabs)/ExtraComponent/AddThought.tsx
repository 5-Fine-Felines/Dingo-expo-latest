import React, { useCallback, useRef, useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import addPost from '@/app/functions/FeedTabOption/addpost';

export default function AddThought() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [thought, setThought] = useState<string>('');
  const [imageLinks, setImageLinks] = useState<string[]>(['']); // Start with one empty image link
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []); // Define snap points for the bottom sheet

 
  

  // Handle open bottom sheet
  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  // Handle post submission
  const handlePost = async () => {
    if (!thought) return;


    // Filter out empty image links
    const validImageLinks = imageLinks.filter((link) => link.trim() !== '');

    // Insert the new thought into the database
    await addPost(thought, validImageLinks);

    // Close the bottom sheet and reset input
    setThought('');
    setImageLinks(['']);
    bottomSheetRef.current?.close();
  };

  // Add new image link input
  const addImageLink = () => {
    setImageLinks([...imageLinks, '']);
  };

  // Update image link at a specific index
  const updateImageLink = (index: number, text: string) => {
    const newLinks = [...imageLinks];
    newLinks[index] = text;
    setImageLinks(newLinks);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpen} style={styles.iconContainer}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpen} style={styles.inputContainer}>
          <Text style={styles.placeholderText}>What's Your thoughts...</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost} style={styles.iconContainer}>
          <Ionicons name="send-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Initially closed
        snapPoints={snapPoints}
        enablePanDownToClose={true} // Allow closing by dragging down
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Share Your Thoughts</Text>
          <TextInput
            style={[styles.input, styles.thoughtInput]}
            placeholder="What's on your mind?"
            value={thought}
            onChangeText={setThought}
            multiline
          />
          {imageLinks.map((link, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Image URL ${index + 1}`}
              value={link}
              onChangeText={(text) => updateImageLink(index, text)}
              onSubmitEditing={() => {
                // Add new input field when user submits the current one
                if (link.trim()) addImageLink();
              }}
            />
          ))}
          <TouchableOpacity onPress={handlePost} style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7e6d4',
    padding: 10,
    borderRadius: 10,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#333',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  thoughtInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#ff9d1d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
