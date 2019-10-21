import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';

import {Icon} from 'native-base';
import geolocation from '@react-native-community/geolocation';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import firebase from 'firebase';
import PushNotification from 'react-native-push-notification';

import {withNavigation} from 'react-navigation';
import _ from 'lodash';

const {width} = Dimensions.get('window');
import Mark from '../assets/image/MabarinMarker.png';

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      region: null,
      longitude: 0,
      latitude: 0,
      users: [],
      userId: '',
      isLoading: true,
      notification: [],
      person: [],
      lastMessage: [],
      run: 0,
      inChat: false,
      user: [],
      runNotif: 0,
      createdAt: 0,
    };
  }

  componentDidMount = async () => {
    await this.usersLocation();
    const user = firebase.auth().currentUser;
    let uid = user.uid;

    await this.setState({userId: user.uid});

    await geolocation.getCurrentPosition(position => {
      let Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0071,
        longitudeDelta: 0.0071,
      };
      firebase
        .database()
        .ref('users/' + this.state.userId)
        .update({Location})
        .then(() => {
          this.setState({isLoading: false});
        });
      this.changeRegion(Location, Location.latitude, Location.longitude);
    });

    firebase
      .database()
      .ref('messages/')
      .child(uid)
      .on('child_changed', async user => {
        if (user.val()) {
          this.getMessage(user.key);
        }
      });

    firebase
      .database()
      .ref('messages/')
      .child(uid)
      .limitToLast(1)
      .on('child_added', async user => {
        if (user.val()) {
          this.getMessage(user.key);
        }
      });
    this.props.navigation.addListener('didFocus', () =>
      this.setState({inChat: false}),
    );
    this.setState({run: 1});
  };

  getMessage = personUid => {
    let user = firebase.auth().currentUser;

    firebase
      .database()
      .ref('messages/' + user.uid + '/' + personUid)
      .limitToLast(1)
      .on('child_added', async lastMessage => {
        if (lastMessage.val()) {
          let messageUser = lastMessage.val();
          if (messageUser.user) {
            if (user.uid !== messageUser.user._id) {
              this.getNotification(messageUser);
            }
          }
        }
      });
  };

  getNotification = messageUser => {
    if (this.state.run > 0 && !this.state.inChat) {
      firebase
        .database()
        .ref('users/' + messageUser.user._id)
        .once('value', async person => {
          let notification = [
            {
              person: messageUser.user._id,
              message: messageUser.text,
              createdAt: messageUser.createdAt,
              from: messageUser.user.name,
              personDetail: person.val(),
            },
          ];
          if (!this.state.notification.length) {
            this.setState({notification});
            this.sendNotification();
          }
        });
    } else {
      let run = this.state.run + 1;
      this.setState({run});
    }
  };

  usersLocation = () => {
    firebase
      .database()
      .ref('users/')
      .on('value', result => {
        let data = result.val();
        if (data !== null) {
          let users = Object.values(data);
          this.setState({
            users,
          });
        }
      });
  };

  changeRegion = (region, lat, long) => {
    this.setState({
      region: region,
      latitude: lat || this.state.latitude,
      longitude: long || this.state.longitude,
    });
  };

  sendNotification = async () => {
    if (this.state.notification.length) {
      const {
        message,
        from,
        personDetail,
        createdAt,
      } = this.state.notification[0];
      // _.once(
      if (createdAt !== this.state.createdAt) {
        PushNotification.localNotification({
          title: 'Message from ' + from,
          message: message,
          playSound: true,
        });
        await this.setState({createdAt});
      }
      // );
      PushNotification.configure({
        onNotification: notif => {
          if (notif.userInteraction) {
            this.setState({inChat: true});
            this.props.navigation.navigate('Chat', personDetail);
          }
        },
      });
      this.setState({notification: []});
    }
  };

  resetRunNotif = async () => {
    await this.setState({runNotif: 0});
  };

  render() {
    // this.sendNotification()
    const {userId} = this.state;
    const matchUser = this.state.users.filter(
      user => user.matching === this.props.navigation.getParam('match'),
    );
    console.log('Match User : ', matchUser);
    return (
      <Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: 'white', fontSize: 18}}
            />
          </TouchableOpacity>
          <Text style={styles.headTitle}>
            Matching : {this.props.navigation.getParam('matchName')}
          </Text>
        </View>
        {this.state.isLoading == true ? (
          <View style={styles.container}>
            <ActivityIndicator color="#006aeb" size={'large'} />
          </View>
        ) : (
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={this.state.region}
              showsUserLocation={true}
              followUserLocation={true}
              zoomControlEnabled={false}
              showsCompass={true}
              minZoomLevel={0}
              maxZoomLevel={20}
              style={styles.map}>
              {matchUser.length
                ? matchUser.map((item, index) => (
                    <Marker
                      key={index}
                      onCalloutPress={async () => {
                        if (item.id !== userId) {
                          await this.setState({inChat: true});
                          this.props.navigation.navigate('Chat', {
                            ...item,
                            onResetRunNotif: this.sendNotification(),
                          });
                        }
                      }}
                      title={item.id == userId ? 'You' : item.username}
                      coordinate={{
                        latitude: item.Location.latitude,
                        longitude: item.Location.longitude,
                      }}>
                      {item.id == userId ? (
                        <View
                          style={{
                            width: 80,
                            height: 80,
                          }}>
                          <Image
                            source={Mark}
                            style={{
                              flex: 1,
                              width: '100%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      ) : (
                        <View style={styles.avatar}>
                          <Image
                            source={{uri: item.photo}}
                            style={styles.image}
                          />
                        </View>
                      )}
                    </Marker>
                  ))
                : null}
            </MapView>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
  },
  avatar: {
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'grey',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headTitle: {
    marginLeft: 15,
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#373737',
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: width / 20,
    flexDirection: 'row',
  },
});

export default withNavigation(Maps);
