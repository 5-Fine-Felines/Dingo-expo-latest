import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router'
import SearchBar from "../../components/common/SearchBar";

interface Post {
  id: string;
  username: string;
  content: string;
  time: string;
}






const index = () => {


  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([
    
    { id: '1', username: 'Sally Rooney', content: 'Do duis cul 😍', time: '11h' },
    { id: '2', username: 'Jason', content: 'Minim magna exc 😎', time: '48m' },
    { id: '3', username: 'Michael Key', content: '@Jason Smith Deserunt officia consectetur adipi', time: '40m' },
    { id: '4', username: 'Liam Pham', content: 'Commodo 🔥', time: '16m' },
    { id: '5', username: 'Kiran Glaucus', content: 'Esse consequat cillum ex', time: '40m' },
  ]);
  const [newPostContent, setNewPostContent] = useState<string>('');


  const handleAddPost = () => {
    if (newPostContent.trim() !== '') {
      const newPost: Post = {
        id: Math.random().toString(),
        username: 'Carl Jonson', // Example username
        content: newPostContent,
        time: 'Just now',
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };



  return (
    <View>
      <Stack.Screen options={{ headerShown:false}} />
       
      
      <View style={styles.addPostContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's your thought?"
          value={newPostContent}
          onChangeText={setNewPostContent}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/40' }} />
              <View>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.postFooter}>
              <FontAwesome name="thumbs-up" size={16} color="gray" />
              <Text style={styles.likeCount}>1 like</Text>
              <TouchableOpacity>
                <Text style={styles.replyButton}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 4,
    marginRight: 16,
    color: 'gray',
  },
  replyButton: {
    color: 'orange',
  },
  addPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;