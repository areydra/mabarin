import React, {useState} from 'react';
import {Text, Alert, Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import {Icon} from 'native-base';
import Moment from 'moment';
import firebase from 'firebase'
import { connect } from 'react-redux';

import { sendRatingFriend } from '../redux/action/user'

const Card = props => {
  const [rating, setRating] = useState(0)

  const sendRating = async() => {
    if(!rating){
      return Alert.alert(
        'Failed', //title
        'You must be add rating', //message or description
        //button dengan text: '', lalu style:'', onPress: ketika di pencet/klik jalankan function reset
        [{ text: 'Ok', style: 'destructive' }]
      );
    }

    let user = firebase.auth().currentUser
    await props.dispatch(sendRatingFriend(user.uid,{rating: rating, friendUid: props.data.friendUid, date: props.data.date}))
  }
  Moment.locale('en');
  return (
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
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonDone} onPress={sendRating}>
            <Text style={{color: 'red'}}>SELESAI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
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
