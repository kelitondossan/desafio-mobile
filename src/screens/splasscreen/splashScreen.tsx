import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../post';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleAnimationFinish = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../../assets/splash.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="contain"  // Garante que a animação se adapte ao tamanho da tela sem distorção
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: Dimensions.get('window').width,  // Usa a largura da tela
    height: Dimensions.get('window').height,  // Usa a altura da tela
    aspectRatio: 1,  // Mantém a proporção da animação
  },
});

export default SplashScreen;
