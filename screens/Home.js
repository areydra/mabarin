import React, {Fragment, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');
const Home = props => {
  const [data, setData] = useState('');
  const user = firebase.auth().currentUser;
  const goProfile = () => {
    props.navigation.navigate('Profile');
  };

  const getUser = async () => {
    const user = firebase.auth().currentUser;
    await firebase
      .database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(result => {
        let data = result.val();

        if (data !== null) {
          setData(data);
        }
      });
  };

  const setMatching = () => {
    props.navigation.addListener('didFocus', () => {
      firebase
        .database()
        .ref('users/' + user.uid)
        .update({matching: null});
    });
  };

  useEffect(() => {
    getUser();
    setMatching();
  }, []);

  const name = data.username;

  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={goProfile} activeOpacity={0.8}>
            <View style={styles.header}>
              {data ? (
                <>
                  <View style={styles.boxImg}>
                    <Image
                      style={styles.imgProfile}
                      source={{
                        uri: data.photo,
                      }}
                    />
                  </View>
                  <View style={styles.profileBox}>
                    <Text style={styles.name}>
                      {name.length > 8 ? name.substr(0, 8) + '...' : name}
                    </Text>

                    <Text style={styles.match}>200 Match</Text>
                  </View>
                  <View style={styles.statusBox}>
                    {data.premium ? (
                      <View style={styles.premiumBox}>
                        <Text style={styles.premium}>Premium</Text>
                      </View>
                    ) : (
                      <View style={styles.premiumBoxOf}>
                        <Text style={styles.premiumOf}>Basic</Text>
                      </View>
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
          </TouchableOpacity>
          <Text style={styles.eventText}>Coming Soon Event</Text>
          <View>
            <ScrollView horizontal={true}>
              <View style={styles.eventBox}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri:
                      'https://gamebrott.com/wp-content/uploads/2016/03/esport-gb-57-768x480.jpg',
                  }}
                />
              </View>
              <View style={styles.eventBox}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri:
                      'https://cdn2.tstatic.net/tribunnews/foto/bank/images/esport_20180922_214430.jpg',
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <Text style={styles.textMabar}>Mabar Now!</Text>

          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={styles.game}>
              <TouchableOpacity
                onPress={() =>
                  firebase
                    .database()
                    .ref('users/' + user.uid)
                    .update({matching: 'ML'})
                    .then(() => {
                      props.navigation.navigate('Maps', {
                        match: 'ML',
                        matchName: 'Mobile Legends',
                      });
                    })
                }>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://www.filemagz.com/wp-content/uploads/2017/12/FILEmagz_MobileLegend-900x445.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  firebase
                    .database()
                    .ref('users/' + user.uid)
                    .update({matching: 'COD'})
                    .then(() => {
                      props.navigation.navigate('Maps', {
                        match: 'COD',
                        matchName: 'Call Of Duty',
                      });
                    })
                }>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  firebase
                    .database()
                    .ref('users/' + user.uid)
                    .update({matching: 'AOV'})
                    .then(() => {
                      props.navigation.navigate('Maps', {
                        match: 'AOV',
                        matchName: 'Arena Of Valor',
                      });
                    })
                }>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://aov.garena.co.id/mobile/static/AOV_Header_Logo.27fcd7cc.png',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  firebase
                    .database()
                    .ref('users/' + user.uid)
                    .update({matching: 'PUBG'})
                    .then(() => {
                      props.navigation.navigate('Maps', {
                        match: 'PUBG',
                        matchName: 'PUBG',
                      });
                    })
                }>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/f7/43/c4/f743c45a69f00a4d6254ce42f3803dd1.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  firebase
                    .database()
                    .ref('users/' + user.uid)
                    .update({matching: 'VG'})
                    .then(() => {
                      props.navigation.navigate('Maps', {
                        match: 'VG',
                        matchName: 'Vain Glory',
                      });
                    })
                }>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/2a/c7/f6/2ac7f632db01559453202539d365eb91.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  firebase
                    .database()
                    .ref('users/' + user.uid)
                    .update({matching: 'TE'})
                    .then(() => {
                      props.navigation.navigate('Maps', {
                        match: 'TE',
                        matchName: 'Tetris',
                      });
                    })
                }>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://thepopinsider.com/wp-content/uploads/2019/06/TETRIS_LOGO_2019.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
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
  header: {
    height: height / 6,
    flexDirection: 'row',
    backgroundColor: '#232323',
    alignItems: 'center',
    paddingHorizontal: width / 20,
  },
  boxImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 160,
    marginRight: 20,
    overflow: 'hidden',
  },
  imgProfile: {
    width: '100%',
    flex: 1,

    resizeMode: 'cover',
  },
  profileBox: {
    width: width / 3.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 3},
    textShadowRadius: 5,
  },
  match: {
    color: 'gray',
    fontSize: 13,
  },
  statusBox: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
  eventBox: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: height / 4,
    width: width / 1.2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 13,
  },
  eventImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  textMabar: {
    fontSize: 18,
    color: 'white',
    padding: 12,
    marginVertical: 8,
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    marginRight: width / -20,
  },
  gameImgBox: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginRight: 18,
    marginBottom: 18,
    overflow: 'hidden',
  },
  gameImg: {
    width: '100%',
    flex: 1,

    resizeMode: 'cover',
  },
});

export default Home;
