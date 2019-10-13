import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  const [uid, setUid] = useState([null]);

  const Check = async () => {
    await setUid(AsyncStorage.getItem('uid'));
    if (uid !== null) {
      props.navigation.navigate('Login');
    } else {
      props.navigation.navigate('Home');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      Check();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/image/splash.jpg')}
        style={styles.splashImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
