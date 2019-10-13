import React, {Fragment} from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import {Header, Left, Right, Body} from 'native-base';

const {width, height} = Dimensions.get('window');
const Profile = () => {
  return (
    <Fragment>
      <Header androidStatusBarColor="gray" style={styles.header}>
        <Left>
          <Text>Hello</Text>
        </Left>
        <Body>
          <Text>Hello2</Text>
        </Body>
        <Right>
          <Text>Hello3</Text>
        </Right>
      </Header>
      <View style={styles.container}>
        <View style={styles.userProfile}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={{
                uri:
                  'http://www.galamedianews.com/media/news/191011214614-orang.png',
              }}
            />
          </View>
          <View style={styles.profileBox}>
            <View style={styles.nameBox}>
              <Text style={styles.name}>React</Text>
              <Text style={styles.edit}>Go</Text>
            </View>
            <Text style={styles.match}>0,61</Text>
          </View>
          <View style={styles.statusBox}>
            <View style={styles.premiumBox}>
              <Text style={styles.premium}>Premium</Text>
            </View>
          </View>
        </View>
        <Text style={styles.open}>Mabar History</Text>
        <View style={styles.historBox}>
          <View style={styles.historyImgBox}>
            <Image
              style={styles.historyImg}
              source={{
                uri:
                  'http://www.galamedianews.com/media/news/191011214614-orang.png',
              }}
            />
          </View>
          <View style={styles.contenBox}>
            <Text style={styles.nameGame}>CEODE</Text>
            <Text style={styles.playWith}>Play With Kunti</Text>
            <Text style={styles.status}>Never Stop</Text>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#373737',
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
    width: width / 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameBox: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  edit: {
    color: 'white',
  },
  match: {
    fontSize: 12,
    color: 'white',
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
  open: {
    fontSize: 18,
    color: 'white',
    padding: 13,
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
    borderColor: 'white',
    borderBottomWidth: 1,
    width: width / 1.5,
  },
  nameGame: {
    fontSize: 15,
    color: 'white',
  },
  playWith: {
    fontSize: 12,
    color: 'white',
    paddingTop: 5,
  },
  status: {
    fontSize: 12,
    color: 'white',
  },
});

export default Profile;
