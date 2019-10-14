import React, {Fragment, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');
const Home = props => {
  const goProfile = () => {
    props.navigation.navigate('Profile');
  };
  const nem = 'Tes';

  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.boxImg}>
              <Image
                style={styles.imgProfile}
                source={{
                  uri:
                    'http://www.galamedianews.com/media/news/191011214614-orang.png',
                }}
              />
            </View>
            <View style={styles.profileBox}>
              <TouchableOpacity onPress={goProfile}>
                <Text style={styles.name}>
                  {nem.length > 8 ? nem.substr(0, 8) + '...' : nem}
                </Text>
                <Text style={styles.match}>200 Match</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusBox}>
              <View style={styles.premiumBox}>
                <Text style={styles.premium}>Premium</Text>
              </View>
            </View>
          </View>
          <Text style={styles.eventText}>Cooming Soon Event</Text>
          <View>
            <ScrollView horizontal={true}>
              <View style={styles.eventBox}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri:
                      'https://images5.alphacoders.com/700/thumb-1920-700733.png',
                  }}
                />
              </View>
              <View style={styles.eventBox}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri:
                      'https://images5.alphacoders.com/700/thumb-1920-700733.png',
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <Text style={styles.textMabar}>Mabar Now!</Text>

          <View style={styles.game}>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
            </View>
            <View style={styles.gameImgBox}>
              <Image
                style={styles.gameImg}
                source={{
                  uri:
                    'https://images7.alphacoders.com/719/thumb-1920-719179.png',
                }}
              />
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
  },
  match: {
    color: 'gray',
    fontSize: 10,
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
  eventBox: {
    marginVertical: 5,
    marginHorizontal: 15,
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
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 13,
  },
  gameImgBox: {
    height: 100,
    width: 110,
    borderRadius: 17,
    marginRight: 9,
    marginBottom: 13,
    overflow: 'hidden',
  },
  gameImg: {
    height: '100%',
  },
});

export default Home;
