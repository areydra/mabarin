import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

import {Icon} from 'native-base';

const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Call Of Duty</Text>
        <Text style={styles.titlePerson}>
          <Icon
            type="AntDesign"
            name="user"
            style={{color: 'white', fontSize: 14}}
          />
          &nbsp; Playing with areydras
        </Text>
        <Text style={styles.titleDate}>10 November 2019 at 10:00 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 80,
    width: 80,
    backgroundColor: 'grey',
    borderRadius: 5,
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
