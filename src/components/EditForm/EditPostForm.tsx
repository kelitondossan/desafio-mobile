import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { PostContext } from '../../context/PostContext';
import {
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from '../../servicos/api';
import { styles } from './EditPostFormStyles';



export const EditPostForm: React.FC = () => {
  const {
    selectedPost,
    clearSelectedPost,
    updatePostInContext,
    setPosts,
    posts,
  } = useContext(PostContext);
  const [title, setTitle] = useState(selectedPost?.title || '');
  const [body, setBody] = useState(selectedPost?.body || '');

  


  const isFormValid = () => title.trim().length > 0 && body.trim().length > 0;

  const handleUpdate = () => {
    if (!selectedPost) return;

    if (!isFormValid()) {
      Alert.alert('Validation Error', 'Title and Body cannot be empty.');
      return;
    }

    const updatedPost = { ...selectedPost, title, body };
    updatePostInContext(updatedPost);
    clearSelectedPost();
    Alert.alert('Successo', 'Publicação Atualizada com successo!');

    apiUpdatePost(selectedPost.id, { title, body })
      .then((response) => {
     
      })
      .catch((error: Error) => {
       
        Alert.alert('Error', 'Failed to update post on server.');
      });
  };

  const handleDelete = () => {
    if (!selectedPost) return;

    Alert.alert(
      'ALERTA!',
      'Tem Certeza que deseja excluir a Publicação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            setPosts(posts.filter((post) => post.id !== selectedPost.id));
            clearSelectedPost();

            apiDeletePost(selectedPost.id)
              .then(() => {
              })
              .catch((error: Error) => {
                Alert.alert('Error', 'Failed to delete post from server.');
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  if (!selectedPost) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Publicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#666"
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
        placeholderTextColor="#666"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUpdate} style={[styles.button, styles.updateButton]}>
          <Image
            source={require('../../assets/edit.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
          <Image
            source={require('../../assets/delete.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearSelectedPost} style={[styles.button, styles.cancelButton]}>
          <Image
            source={require('../../assets/cancel.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditPostForm;
