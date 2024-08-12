import { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image } from 'react-native';
import { createPost as apiCreatePost } from '../../servicos/api';
import { PostContext } from '../../context/PostContext';
import { styles } from '../createForm/CreateFormstyles';

export const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { addPost } = useContext(PostContext);

  const isFormValid = () => title.trim().length > 0 && body.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Validation Error', 'Title and Body cannot be empty.');
      return;
    }

   

    apiCreatePost({ userId: 1, title, body })
      .then(response => {
        
        addPost(response.data);
        setTitle('');
        setBody('');
      })
      .catch(error => {
       
        Alert.alert('Error', 'Failed to create post. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter post title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Comentario:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter post body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit} 
        disabled={!isFormValid()}
      >
        <Image
          source={require('../../assets/create.png')}  
          style={styles.buttonIcon}
        />
     
      </TouchableOpacity>
    </View>
  );
};

