import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {Header, Left, Right, Body, Icon} from 'native-base';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const {height, width} = Dimensions.get('window');

const editProfile = props => {
  const [userName, setUserName] = useState('');
  const [img, setImg] = useState('');

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    firebase
      .database()
      .ref(`users/${user.uid}`)

      .on('value', datas => {
        let data = datas.val();
        setImg(data.photo);
        setUserName(data.username);
      });
  };

  const onSave = async () => {
    const user = firebase.auth().currentUser.uid;
    if (userName.length < 3) {
      ToastAndroid.show('Min Length 3', ToastAndroid.LONG, ToastAndroid.CENTER);
    } else {
      await firebase
        .database()
        .ref(`users/${user}`)
        .update({username: userName});
      goProfile();
    }
  };

  const imagePic = async () => {
    const user = firebase.auth().currentUser.uid;
    let Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ])
      .then(result => {
        if (
          result['android.permission.CAMERA'] === 'granted' &&
          result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          ImagePicker.showImagePicker(options, response => {
            let uploadBob = null;
            const imageRef = firebase.storage().ref(`profile/${user}`);
            fs.readFile(response.path, 'base64')
              .then(data => {
                return Blob.build(data, {type: `${response.mime};BASE64`});
              })
              .then(blob => {
                uploadBob = blob;
                return imageRef.put(blob, {contentType: `${response.mime}`});
              })
              .then(() => {
                uploadBob.close();
                return imageRef.getDownloadURL();
              })
              .then(async url => {
                firebase
                  .database()
                  .ref(`users/${user}`)
                  .update({photo: url});
                setImg(url).catch(err => console.log(err));
              });
          });
        } else if (
          result['android.permission.CAMERA'] === 'denied' &&
          result['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
        ) {
          ToastAndroid.show(
            'Allow Permission to Continue',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <View style={styles.header}>
        <TouchableOpacity onPress={goProfile}>
          <Icon type="AntDesign" name="left" style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.textHeader}>Edit Profile</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={{uri: img}} />
          </View>
          <TouchableOpacity
            onPress={imagePic}
            style={styles.buttonImage}
            activeOpacity={0.9}>
            <Icon
              type="Entypo"
              name="camera"
              style={{color: 'white', fontSize: 17}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nameBox}>
          <TextInput
            defaultValue={userName}
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
  imgContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonImage: {
    height: 30,
    width: 30,
    backgroundColor: '#00000090',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -55,
    marginRight: -75,
    zIndex: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 18,
  },
  header: {
    backgroundColor: '#373737',
    paddingHorizontal: 20,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '700',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 5,
    marginVertical: 30,

    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    color: '#3355ff',
  },
});

export default editProfile;
