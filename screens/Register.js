import React, {useState, Fragment} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

const Register = props => {
  const goRegister = () => {
    props.navigation.navigate('Login');
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
          <Text style={styles.welcom}>Create an account</Text>
        </View>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
        />
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
        <TextInput
          placeholder="Re-type Password"
          placeholderTextColor="#9c9c9c"
          secureTextEntry
          style={styles.box}
        />
        <View style={styles.button}>
          <Text style={styles.textBtn}>Register</Text>
        </View>
        <View style={styles.boxReg}>
          <Text style={styles.texReg1}>Don't have any account?</Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={styles.texReg2}>Login</Text>
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
    padding: 10,
  },
  logo: {
    width: width / 2,
    height: 32,
    resizeMode: 'stretch',
    marginBottom: 40,
  },
  boxWelcom: {
    marginBottom: width / 7.5,
  },
  welcom: {
    color: 'white',
    fontSize: 19,
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
    marginTop: width / 7,
    backgroundColor: '#004DAA',
    width: 150,
    paddingVertical: 10,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
  boxReg: {
    marginTop: width / 7,
    flexDirection: 'row',
  },
  texReg1: {
    color: 'white',
  },
  texReg2: {
    color: '#004DAA',
  },
});

export default Register;
