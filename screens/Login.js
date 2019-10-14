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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const goRegister = () => {
    props.navigation.navigate('Register');
  };

  const onLogin = async () => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setLoading(false);
        props.navigation.navigate('Home');
        ToastAndroid.show(
          'Login Success',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      })
      .catch(err => {
        ToastAndroid.show(
          'User Atau Password Salah',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setLoading(false);
      });
  };
  console.log(loading);

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
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity onPress={onLogin}>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.textBtn}>Login</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.boxReg}>
          <Text style={styles.texReg1}>Don't have any account?</Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={styles.texReg2}> Register</Text>
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
    height: height / 21,
    resizeMode: 'stretch',
    marginBottom: width / 6,
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
    color: 'white',
  },
  button: {
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: width / 5,
    backgroundColor: '#004DAA',
    width: width / 3,
    paddingVertical: 12,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
  boxReg: {
    marginTop: height / 7,
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
