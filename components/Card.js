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
      sendRatingFriend(props.data.friendUid, {
        rating: rating,
        friendUid: user.uid,
        date: props.data.date,
      }),
    );
    await firebase
      .database()
      .ref('users/' + user.uid)
      .update({statusMatch: null});
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
          {!props.data.rating ? (
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonDone}
                onPress={sendRating}>
                <Text style={{color: 'white'}}>SELESAI</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      {!props.data.rating ? (
        <View style={styles.bottom}>
          <Text
            style={{
              color: 'white',
            }}>
            Rate Your Friends
          </Text>
          <View style={styles.rateContainer}>
            <TouchableOpacity
              onPress={() => setRating(1)}
              style={[
                styles.rateButton,
                rating === 1 || props.data.rating
                  ? {
                      borderColor: '#006aeb',
                      backgroundColor: '#006aeb',
                    }
                  : {
                      borderColor: 'grey',
                    },
              ]}>
              <Text
                style={[
                  styles.rateText,
                  {color: rating === 1 ? 'black' : 'grey'},
                ]}>
                TAY!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRating(2)}
              style={[
                styles.rateButton,
                rating === 2
                  ? {
                      borderColor: '#006aeb',
                      backgroundColor: '#006aeb',
                    }
                  : {
                      borderColor: 'grey',
                    },
              ]}>
              <Text
                style={[
                  styles.rateText,
                  {color: rating === 2 ? 'black' : 'grey'},
                ]}>
                BLOKK!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRating(3)}
              style={[
                styles.rateButton,
                rating === 3
                  ? {
                      borderColor: '#006aeb',
                      backgroundColor: '#006aeb',
                    }
                  : {
                      borderColor: 'grey',
                    },
              ]}>
              <Text
                style={[
                  styles.rateText,
                  {color: rating === 3 ? 'black' : 'grey'},
                ]}>
                NOOB
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRating(4)}
              style={[
                styles.rateButton,
                rating === 4
                  ? {
                      borderColor: '#006aeb',
                      backgroundColor: '#006aeb',
                    }
                  : {
                      borderColor: 'grey',
                    },
              ]}>
              <Text
                style={[
                  styles.rateText,
                  {color: rating === 4 ? 'black' : 'grey'},
                ]}>
                MAYAN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRating(5)}
              style={[
                styles.rateButton,
                rating === 5
                  ? {
                      borderColor: '#006aeb',
                      backgroundColor: '#006aeb',
                    }
                  : {
                      borderColor: 'grey',
                    },
              ]}>
              <Text
                style={[
                  styles.rateText,
                  {color: rating === 5 ? 'black' : 'grey'},
                ]}>
                MANTUL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
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
    backgroundColor: '#ad0005',
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
