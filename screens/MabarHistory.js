import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';

import Card from '../components/Card';
import {connect} from 'react-redux';
import {getUser} from '../redux/action/user';
import firebase from 'firebase';

class MabarHistory extends Component {
  constructor() {
    super();
    this.state = {
      userHistory: [],
    };
  }

  componentDidMount = () => {
    const user = firebase.auth().currentUser;

    this.props.navigation.addListener('didFocus', async () => {
      await this.props.dispatch(getUser(user.uid));
    });
  };

  render() {
    // console.log(this.props.userData);
    return (
      <SafeAreaView style={styles.mabarHistoryContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mabar History</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {!this.props.userData
              ? null
              : this.props.userData.mabarhistory.map((item, index) => {
                  return <Card key={index} data={item} />;
                })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mabarHistoryContainer: {
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
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(MabarHistory);
