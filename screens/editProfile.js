import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {Header, Left, Right, Body, Icon} from 'native-base';
import firebase from 'firebase';

const {height, width} = Dimensions.get('window');

const editProfile = props => {
  const [userName, setUserName] = useState('');

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };

  const user = firebase.auth().currentUser.photoURL;
  console.log(userName);

  const onSave = async () => {
    const user = firebase.auth().currentUser.uid;
    if (userName.length < 3) {
      Alert.alert('min Lenght 3');
    } else {
      await firebase
        .database()
        .ref(`users/${user}`)
        .update({username: userName});
      goProfile();
    }
  };

  return (
    <Fragment>
      <Header androidStatusBarColor="gray" style={styles.header}>
        <Left>
          <TouchableOpacity onPress={goProfile}>
            <Icon style={styles.icon} type="AntDesign" name="left" />
          </TouchableOpacity>
        </Left>
        <Body></Body>
      </Header>

      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.texTitle}>Edit Profile</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={{uri: user}} />
          </View>
        </TouchableOpacity>
        <View style={styles.nameBox}>
          <TextInput
            placeholder="UserName"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={text => setUserName(text)}
          />
        </View>
        <TouchableOpacity onPress={onSave}>
          <View style={styles.btnBox}>
            <Text style={styles.btn}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 15,
  },
  header: {
    backgroundColor: '#373737',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  texTitle: {
    fontSize: 20,
    color: 'white',
  },
  imgBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 160,
    marginVertical: 25,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  nameBox: {},

  input: {
    color: 'white',
    marginLeft: 10,
    borderBottomColor: '#8a8a8a',
    borderBottomWidth: 1,
    padding: 0,
    width: width / 1.5,
  },
  btnBox: {
    borderColor: '#3355ff',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 30,
  },
  btn: {
    color: '#3355ff',
    padding: 10,
  },
});

export default editProfile;
