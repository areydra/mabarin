import React, {Fragment, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {Header, Left, Right, Body, Icon} from 'native-base';
import firebase from 'firebase';
import Card from '../components/Card';
import {connect} from 'react-redux';
import {getUser} from '../redux/action/user';

const {width, height} = Dimensions.get('window');

const Profile = props => {
  const [data, setData] = useState('');
  const [img, setImg] = useState('');
  const [username, setUserName] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const user = firebase.auth().currentUser;
    await props.dispatch(getUser(user.uid));
    firebase
      .database()
      .ref(`users/${user.uid}`)

      .on('value', datas => {
        let data = datas.val();
        setImg(data.photo);
        setData(data);
        setUserName(data.username);
      });
  };
  const name = username;

  const goHome = () => {
    props.navigation.navigate('Home');
  };
  const goEditProfile = () => {
    props.navigation.navigate('EditProfile');
  };

  return (
    <Fragment>
      <View style={styles.header}>
        <TouchableOpacity onPress={goHome}>
          <Icon type="AntDesign" name="left" style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.textHeader}>Profile</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userProfile}>
          {data ? (
            <>
              <View style={styles.imgBox}>
                <Image
                  style={styles.img}
                  source={{
                    uri: img,
                  }}
                />
              </View>

              <View style={styles.profileBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.name}>
                    {name.length > 6 ? name.substr(0, 6) + '...' : name}
                  </Text>
                  <TouchableOpacity onPress={goEditProfile}>
                    <Icon
                      type="MaterialCommunityIcons"
                      name="square-edit-outline"
                      style={{color: 'white', fontSize: 20}}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.match}>
                  {props.userData.mabarhistory.length} Match
                </Text>
              </View>
              <View style={styles.statusBox}>
                {data.premium ? (
                  <>
                    <View style={styles.premiumBox}>
                      <Text style={styles.premium}>PREMIUM</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.premiumBoxOf}
                      onPress={() => props.navigation.navigate('BuyPremium')}>
                      <Text style={styles.premiumOf}>BASIC</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </>
          ) : (
            <View style={styles.loadingBox}>
              <ActivityIndicator
                color="#006aeb"
                size="large"
                style={styles.loading}
              />
            </View>
          )}
        </View>
        <Text style={styles.open}>Mabar History</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {props.userData.length === 0
            ? null
            : props.userData.mabarhistory.map((item, index) => {
                return <Card key={index} data={item} />;
              })}
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
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
  loadingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  userProfile: {
    flexDirection: 'row',
    backgroundColor: '#232323',
    height: height / 7,
    paddingHorizontal: width / 20,

    alignItems: 'center',
  },
  imgBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 160,
    marginRight: 20,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },

  profileBox: {
    width: width / 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  name: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
    fontWeight: '700',
  },
  editBox: {
    marginTop: 10,
    borderColor: '#3355ff',
    borderWidth: 1,
    borderRadius: 6,
  },
  edit: {
    fontSize: 15,
    color: '#3355ff',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  match: {
    fontSize: 12,
    color: 'gray',
  },
  statusBox: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBox: {
    borderColor: '#DDC535',
    borderWidth: 1,
    borderRadius: 6,
  },
  premium: {
    fontSize: 15,
    color: '#DDC535',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  premiumBoxOf: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
  },
  premiumOf: {
    fontSize: 15,
    color: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  open: {
    fontSize: 18,
    color: 'white',
    padding: 13,
    fontWeight: '700',
  },
  historBox: {
    flexDirection: 'row',
    paddingHorizontal: 13,
  },
  historyImgBox: {
    height: 100,
    width: 100,
    borderRadius: 18,
    overflow: 'hidden',
  },
  historyImg: {
    width: 100,
    height: 100,
  },
  contenBox: {
    marginLeft: 13,
    borderColor: '#9c9c9c',
    borderBottomWidth: 1,
    width: width / 1.5,
  },
  nameGame: {
    fontSize: 15,
    color: 'white',
  },
  playWith: {
    fontSize: 12,
    color: '#b5b5b5',
    paddingTop: 5,
  },
  status: {
    fontSize: 12,
    color: '#b5b5b5',
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Profile);
