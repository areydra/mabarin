import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  Alert,
} from 'react-native';

import {Icon} from 'native-base';
import geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';

const {width} = Dimensions.get('window');

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      region: null,
      longitude: 0,
      latitude: 0,
    };
  }

  componentDidMount = async () => {
    geolocation.getCurrentPosition(position => {
      let Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0071,
        longitudeDelta: 0.0071,
      };
      // firebase
      //   .database()
      //   .ref('users/' + this.state.userId)
      //   .update({Location})
      //   .then(() => {
      //     this.setState({isLoading: false});
      //   });
      this.changeRegion(Location, Location.latitude, Location.longitude);
    });
  };

  changeRegion = (region, lat, long) => {
    this.setState({
      region: region,
      latitude: lat || this.state.latitude,
      longitude: long || this.state.longitude,
    });
  };

  render() {
    return (
      <Fragment>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: 'white', fontSize: 18}}
            />
          </TouchableOpacity>
          <Text style={styles.headTitle}>Maps</Text>
        </View>
        <View style={styles.container}>
          <MapView
            initialRegion={this.state.region}
            showsUserLocation={true}
            followUserLocation={true}
            zoomControlEnabled={false}
            showsCompass={true}
            minZoomLevel={0}
            maxZoomLevel={20}
            style={styles.map}>
            <Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
            />
          </MapView>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headTitle: {
    marginLeft: 15,
    fontSize: 18,
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

export default Maps;
