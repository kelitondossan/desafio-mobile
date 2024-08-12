import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PostContext } from '../../context/PostContext';
import { getPostComments } from '../../servicos/api';
import { styles } from './PostDetailStyles'
interface Comment {
  id: number;
  body: string;
}

export const PostDetail: React.FC = () => {
  const { selectedPost } = useContext(PostContext);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (selectedPost) {
      getPostComments(selectedPost.id)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => console.error('Failed to fetch comments:', error));
    }
  }, [selectedPost]);

  if (!selectedPost) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{selectedPost.title}</Text>
        <Text style={styles.body}>{selectedPost.body}</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.commentsTitle}>Comments:</Text>
        {comments.map((comment) => (
          <View key={comment.id} style={{ padding: 10, backgroundColor: '#eee', marginVertical: 5 }}>
            <Text style={{ color: 'black' }}>{comment.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

