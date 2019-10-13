import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
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
