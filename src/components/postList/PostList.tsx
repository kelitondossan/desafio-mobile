import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { PostContext } from '../../context/PostContext';
import { getPosts, deletePost as apiDeletePost } from '../../servicos/api';
import { Post } from '../../Post';
import { styles } from './PostlistStyles';

export const PostList: React.FC = () => {
  const { posts, setPosts, selectPost } = useContext(PostContext);
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      console.log('Loading posts...');
      const response = await getPosts();
      const postIds = response.data.map(post => post.id);
      console.log('Fetched post IDs:', postIds); // Verifica se há IDs duplicados
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleEdit = (post: Post) => {
    selectPost(post);
    Alert.alert('Você está editando', `Título da Publicação: ${post.title}`);
  };

  const handleDelete = (post: Post) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este post?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await apiDeletePost(post.id);
              setPosts(prevPosts => prevPosts.filter(p => p.id !== post.id));
              Alert.alert('Sucesso', 'Publicação excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir a Publicação:', error);
              Alert.alert('Erro', 'Falha ao excluir Publicação.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer} key={item.id.toString()}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => handleEdit(item)}
        >
          <Image
            source={require('../../assets/edit.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => handleDelete(item)}
        >
          <Image
            source={require('../../assets/delete.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={() => <Text style={styles.noPostsText}>Não Existe Publicações Crie!</Text>}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#4CAF50']}
        />
      }
    />
  );
};
