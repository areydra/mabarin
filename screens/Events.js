import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Icon} from 'native-base';

const {width} = Dimensions.get('window');

const Events = props => {
  return (
    <SafeAreaView style={styles.eventsContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.goBack()}>
          <Icon type="AntDesign" name="left" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require('../assets/image/events.jpg')}
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tournament Mobile Legends</Text>
            <Text style={styles.titleDate}>Indonesia, 11 November</Text>
          </View>
          <View style={styles.prizeContainer}>
            <Text style={styles.textPrize}>Prize</Text>
            <View style={styles.prize}>
              <Text style={styles.amountPrize}>$1109</Text>
            </View>
          </View>
          <View style={styles.textDescriptionContainer}>
            <Text style={styles.textDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat sed lectus vestibulum mattis. Vitae purus faucibus ornare
              suspendisse sed nisi lacus sed. Semper quis lectus nulla at
              volutpat diam ut venenatis tellus. Non sodales neque sodales ut.
              Volutpat ac tincidunt vitae semper quis lectus nulla. Scelerisque
              felis imperdiet proin fermentum leo vel orci. Amet mattis
              vulputate enim nulla aliquet porttitor lacus. Parturient montes
              nascetur ridiculus mus mauris. Et ligula ullamcorper malesuada
              proin libero.
            </Text>
            <Text style={styles.textDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat sed lectus vestibulum mattis. Vitae purus faucibus ornare
              suspendisse sed nisi lacus sed. Semper quis lectus nulla at
              volutpat diam ut venenatis tellus. Non sodales neque sodales ut.
              Volutpat ac tincidunt vitae semper quis lectus nulla. Scelerisque
              felis imperdiet proin fermentum leo vel orci. Amet mattis
              vulputate enim nulla aliquet porttitor lacus. Parturient montes
              nascetur ridiculus mus mauris. Et ligula ullamcorper malesuada
              proin libersasaso.
            </Text>
          </View>

          <View style={styles.buttonRegister}>
            <Text style={styles.buttonText}>Register For $99</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    height: 60,
    backgroundColor: '#373737',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 18,
    color: 'white',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  titleContainer: {
    marginVertical: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width / 18,
  },
  titleDate: {
    color: 'white',
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingBottom: 20,
    marginHorizontal: width / 15,
  },
  image: {
    height: 150,
    width: '100%',
    marginTop: width / 20,
  },
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrize: {
    fontSize: 17,
    color: 'white',
    marginRight: 10,
  },
  prize: {
    marginVertical: 5,
    borderColor: '#DDC535',
    borderWidth: 1,
    width: 65,
    borderRadius: 5,
  },
  amountPrize: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#DDC535',
  },
  textDescriptionContainer: {
    marginTop: 15,
  },
  textDescription: {
    color: 'white',
  },
  buttonRegister: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'green',
    width: 120,
    height: 35,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Events;
