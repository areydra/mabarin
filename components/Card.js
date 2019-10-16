import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

import {Icon} from 'native-base';
import Moment from 'moment';

const Card = props => {
  Moment.locale('en');
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{uri: props.data.image}} style={styles.img} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.data.game}</Text>
        <Text style={styles.titlePerson}>
          <Icon
            type="AntDesign"
            name="user"
            style={{color: 'white', fontSize: 14}}
          />
          &nbsp; Playing with {props.data.uidfriend}
        </Text>
        <Text style={styles.titleDate}>
          {Moment(props.data.date).format('D MMM, YYYY, h:mm:ss a')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Card;
