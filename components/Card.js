import React, {useState, Fragment} from 'react';
import {
  Text,
  Alert,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Icon} from 'native-base';
import Moment from 'moment';
import firebase from 'firebase';
import {connect} from 'react-redux';

import {sendRatingFriend} from '../redux/action/user';

const Card = props => {
  const [rating, setRating] = useState(0);

  const sendRating = async () => {
    if (!rating) {
      return Alert.alert(
        'Failed', //title
        'You must be add rating', //message or description
        //button dengan text: '', lalu style:'', onPress: ketika di pencet/klik jalankan function reset
        [{text: 'Ok', style: 'destructive'}],
      );
    }

    let user = firebase.auth().currentUser;
    await props.dispatch(
      sendRatingFriend(user.uid, {
        game: props.data.game,
        rating: rating,
        friendUid: props.data.friendUid,
        date: props.data.date,
      }),
    );
  };
  Moment.locale('en');
  return (
    <Fragment>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{uri: props.data.image}} style={styles.img} />
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>{props.data.game}</Text>
            <Text style={styles.titlePerson}>
              <Icon
                type="AntDesign"
                name="user"
                style={{color: 'white', fontSize: 14}}
              />
              &nbsp; Playing with {props.data.name}
            </Text>
            <Text style={styles.titleDate}>
              {Moment(props.data.date).format('D MMM, YYYY, h:mm:ss a')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonDone}
              onPress={sendRating}>
              <Text style={{color: 'red'}}>SELESAI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text
          style={{
            color: 'white',
          }}>
          Rate Your Friends
        </Text>
        <View style={styles.rateContainer}>
          <TouchableOpacity
            style={[styles.rateButton, {borderColor: '#8c3e1c'}]}>
            <Text style={[styles.rateText, {color: '#8c3e1c'}]}>BRONZE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rateButton, {borderColor: 'silver'}]}>
            <Text style={[styles.rateText, {color: 'silver'}]}>SILVER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rateButton, {borderColor: '#edcd2b'}]}>
            <Text style={[styles.rateText, {color: '#edcd2b'}]}>GOLD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rateButton, {borderColor: '#16de5c'}]}>
            <Text style={[styles.rateText, {color: '#16de5c'}]}>DIAMOND</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rateButton, {borderColor: 'white'}]}>
            <Text style={[styles.rateText, {color: 'white'}]}>PLATINUM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  rateText: {
    fontSize: 11,
    fontWeight: '700',
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },

  rateButton: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
  },
  buttonDone: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  img: {
    resizeMode: 'cover',
    flex: 1,
  },
  card: {
    margin: 15,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 80,
    width: 80,
    backgroundColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 15,
    height: '100%',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  titlePerson: {
    fontSize: 13,
    color: 'whitesmoke',
    flex: 1,
  },
  titleDate: {
    color: 'silver',
    fontSize: 10,
    flex: 1,
  },
});

export default connect()(Card);
