import React, {useState, Fragment} from 'react';
import {
  Text,
  Button,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

const Login = props => {
  const goRegister = () => {
    props.navigation.navigate('Register');
  };
  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require('../assets/logo/logo.png')}
          />
        </View>

        <View style={styles.boxWelcom}>
          <Text style={styles.welcom}>Welcome Back!</Text>
        </View>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
          secureTextEntry
        />
        <View style={styles.button}>
          <Text style={styles.textBtn}>Login</Text>
        </View>
        <View style={styles.boxReg}>
          <Text style={styles.texReg1}>Don't have any account?</Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={styles.texReg2}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232323',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width / 2,
    height: 32,
    resizeMode: 'stretch',
    marginBottom: 50,
  },
  boxWelcom: {
    marginBottom: width / 6.5,
  },
  welcom: {
    color: 'white',
    fontSize: 22,
  },
  box: {
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
    width: width / 1.3,
    color: '#9c9c9c',
  },
  button: {
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: width / 5,
    backgroundColor: '#004DAA',
    width: 150,
    paddingVertical: 10,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
  boxReg: {
    marginTop: width / 5,
    flexDirection: 'row',
  },
  texReg1: {
    color: 'white',
  },
  texReg2: {
    color: '#004DAA',
  },
});

export default Login;
