import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../post';
import { styles } from '../homescreen/homescreenStyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    navigation.navigate('PostScreen');
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#e0f2f1', '#b2dfdb']} style={styles.gradient}>
        <View style={styles.innerContainer}>
          <LottieView
            source={require('../../assets/TimeAni.json')}
            autoPlay
            loop
            style={styles.logo}
          />
          <Text style={styles.title}>New Time</Text>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              accessible={true}
              accessibilityLabel="Ir para publicações"
              style={styles.button}
            >
              <LottieView
                source={require('../../assets/buttonPubli.json')}
                autoPlay
                loop
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              />
              <Text style={styles.buttonText}>Publicações</Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity
              onPress={() => openLink('https://www.facebook.com')}
              style={styles.iconButton}
            >
              <LottieView
                source={require('../../assets/FacebookAni.json')}
                autoPlay
                loop
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('https://www.twitter.com')}
              style={styles.iconButton}
            >
              <LottieView
                source={require('../../assets/TwitterAni.json')}
                autoPlay
                loop
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('mailto:your-email@gmail.com')}
              style={styles.iconButton}
            >
              <LottieView
                source={require('../../assets/GmailAni.json')}
                autoPlay
                loop
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
