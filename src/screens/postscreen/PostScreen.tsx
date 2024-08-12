import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { CreatePostForm } from '../../components/createForm/CreatePostForm';
import { PostList } from '../../components/postList/PostList';
import { PostDetail } from '../../components/postDetail/PostDetail';
import { EditPostForm } from '../../components/EditForm/EditPostForm';
import { PostContext } from '../../context/PostContext';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../post';
import { styles } from '../postscreen/PostScreenStyles';

type PostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: PostScreenNavigationProp;
};

const PostScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedPost } = useContext(PostContext);

  return (
    <LinearGradient colors={['#e0f2f1', '#b2dfdb']} style={styles.gradient}>
      <View style={styles.header}>
        <View style={styles.clockContainer}>
          <LottieView
            source={require('../../assets/TimeAni.json')}
            autoPlay
            loop
            style={styles.clockImage}  // ajuste o estilo conforme necessário
          />
          <Text style={styles.clockText}>Hora de publicar</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LottieView
            source={require('../../assets/HomeAni.json')}  // substitua com o JSON para o ícone da casa, se tiver
            autoPlay
            loop
            style={styles.HomeImage}  // ajuste o estilo conforme necessário
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {!selectedPost ? (
          <View style={styles.contentContainer}>
            <CreatePostForm />
            <PostList />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <PostDetail />
            <EditPostForm />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default PostScreen;
