import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from 'firebase';

const More = props => {
  const logOut = () => {
    const user = firebase.auth().currentUser;
    firebase
      .auth()
      .signOut()
      .then(() => {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .update({status: 'offline'});
        props.navigation.navigate('Login');
      })
      .catch(error => console.log(error));
  };

  const confirmation = () => {
    Alert.alert(
      'Log Out',
      'Are you sure want to log out this Mabarin account?',
      [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => logOut()},
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.moreContainer}>
      <View style={styles.header}>
        {/* <Image
          source={require('../assets/icons/left-arrow.png')}
          style={styles.icon}
        /> */}
        <Text style={styles.headerTitle}>More</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('BuyPremium')}
            activeOpacity={0.8}>
            <View style={styles.menu}>
              <Text style={styles.menuText}>Buy Premium</Text>
              <Image
                source={require('../assets/icons/right-arrow.png')}
                style={styles.menuIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('Contact Us')}
            activeOpacity={0.8}>
            <View style={styles.menu}>
              <Text style={styles.menuText}>Contact Us</Text>
              <Image
                source={require('../assets/icons/right-arrow.png')}
                style={styles.menuIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('About Mabarin')}
            activeOpacity={0.8}>
            <View style={styles.menu}>
              <Text style={styles.menuText}>About Mabarin</Text>
              <Image
                source={require('../assets/icons/right-arrow.png')}
                style={styles.menuIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Others')} activeOpacity={0.8}>
            <View style={styles.menu}>
              <Text style={styles.menuText}>Others</Text>
              <Image
                source={require('../assets/icons/right-arrow.png')}
                style={styles.menuIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmation} activeOpacity={0.8}>
            <View style={[styles.menu, {backgroundColor: 'whitesmoke'}]}>
              <Text style={styles.menuTextLogout}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  moreContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    backgroundColor: '#373737',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  menu: {
    flex: 1,
    height: 55,
    flexDirection: 'row',
    borderBottomColor: 'whitesmoke',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 18,
    color: 'grey',
  },
  menuIcon: {
    width: 14,
    height: 14,
  },
  menuTextLogout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC0808',
  },
});

export default More;
