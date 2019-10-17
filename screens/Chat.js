import React, {Component, Fragment} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ToastAndroid,
  TouchableHightLight,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import firebase from 'firebase';

import {sendHistory} from '../redux/action/user';

const {width} = Dimensions.get('window');

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      friendData: {},
      user: {},
      text: '',
      statusMatch: '',
    };
  }

  componentDidMount = async () => {
    await this.setState({friendData: this.props.navigation.state.params});
    const user = firebase.auth().currentUser;
    await this.setState({user});
    firebase
      .database()
      .ref('users/' + user.uid)
      .on('value', res => {
        let data = res.val();
        if (data.statusMatch) {
          this.setState({statusMatch: data.statusMatch});
        }
      });

    firebase
      .database()
      .ref('messages')
      .child(user.uid)
      .child(this.state.friendData.id)
      .on('child_added', value => {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, value.val()),
          };
        });
      });
  };

  onSend = () => {
    if (this.state.text.length > 0) {
      this.props.navigation.state.params.onResetRunNotif;
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.user.uid)
        .child(this.state.friendData.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.user.uid,
          name: this.state.user.displayName,
          // avatar: this.state.avatar,
        },
      };
      updates[
        'messages/' +
          this.state.user.uid +
          '/' +
          this.state.friendData.id +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.friendData.id +
          '/' +
          this.state.user.uid +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({text: ''});
    }
  };

  invite = () => {
    if (this.state.user.statusMatch !== 'Invited') {
      firebase
        .database()
        .ref('users/' + this.state.friendData.id)
        .update({statusMatch: 'invited'});
    } else {
      ToastAndroid.show(
        'Udah ada yang punya kak',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
    this.setState({statusMatch: 'inMatch'});

    firebase
      .database()
      .ref('users/' + this.state.friendData.id)
      .on('child_changed', friend => {
        if (friend.val().statusMatch === undefined) {
          this.props.navigation.navigate('Home');
        }
      });
  };

  renderSend(props) {
    return (
      <Send {...props} containerStyle={{marginRight: 10, marginBottom: 10}}>
        <Icon
          type="MaterialCommunityIcons"
          name="send"
          style={{color: '#006aeb'}}
        />
      </Send>
    );
  }

  _renderInput(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          maxHeight: 60,
        }}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderRadius: 8,
          },
          left: {
            borderRadius: 8,
          },
        }}
      />
    );
  }

  acceptInvite = async () => {
    let date = Date.now();
    await this.props.dispatch(
      sendHistory(this.state.user.uid, {
        game: this.state.friendData.game,
        friendUid: this.state.friendData.id,
        name: this.state.friendData.username,
        date: date,
      }),
    );
    await this.props.dispatch(
      sendHistory(this.state.friendData.id, {
        game: this.state.friendData.game,
        friendUid: this.state.user.uid,
        name: this.state.user.displayName,
        date: date,
      }),
    );
    await firebase
      .database()
      .ref('users/' + this.state.friendData.id)
      .update({statusMatch: 'inMatch'});
    await firebase
      .database()
      .ref('users/' + this.state.user.uid)
      .update({statusMatch: 'inMatch'});
    this.setState({statusMatch: null});
    this.props.navigation.navigate('Home');
  };

  declineInvite = () => {
    firebase
      .database()
      .ref('users/' + this.state.user.uid)
      .update({statusMatch: null});
    this.setState({statusMatch: null});
  };

  render() {
    const {friendData} = this.state;
    return (
      <Fragment>
        {/* Overlay Notif */

        this.state.statusMatch === 'invited' ? (
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <View style={styles.inv}>
                <Text>{this.state.friendData.username} Has invited you</Text>
              </View>
              <View style={styles.buttonMenu}>
                <View style={styles.butJoin}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.declineInvite()}>
                    <Text
                      style={{color: 'red', fontSize: 16, fontWeight: '700'}}>
                      Decline
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.butJoin}>
                  <TouchableOpacity
                    onPress={() => this.acceptInvite()}
                    activeOpacity={0.8}
                    style={styles.butAccept}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '700',
                      }}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : null}
        {/* Overlay Notif END */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: 'white', fontSize: 18}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headSub}
            onPress={() =>
              this.props.navigation.navigate('FriendsProfile', friendData)
            }>
            <View style={styles.img}>
              <Image source={{uri: friendData.photo}} style={styles.image} />
            </View>
            <View style={styles.sub}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                {friendData.username}
              </Text>
              <Text style={{color: 'white'}}>{friendData.status}</Text>
            </View>
          </TouchableOpacity>
          {this.state.statusMatch !== 'inMatch' ? (
            <View style={styles.but}>
              <TouchableOpacity
                onPress={() => this.invite()}
                activeOpacity={0.8}
                style={styles.button}>
                <Text style={{fontSize: 18, color: '#00c91e'}}>Invite</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={{backgroundColor: '#232323', flex: 1}}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            showAvatarForEveryMessage={true}
            renderBubble={this.renderBubble}
            renderAvatar={() => null}
            renderInputToolbar={this._renderInput}
            renderSend={this.renderSend}
            alwaysShowSend={true}
            alignTop={true}
            user={{
              _id: this.state.user.uid,
              name: this.state.user.displayName,
            }}
            onInputTextChanged={value => this.setState({text: value})}
          />
        </View>
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
  butAccept: {
    backgroundColor: 'green',
    borderRadius: 5,
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  butJoin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMenu: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  modal: {
    backgroundColor: 'white',
    height: 120,
    width: '70%',
    borderRadius: 5,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    width: '70%',
    height: 32,
    borderColor: '#00c91e',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
    marginLeft: 10,
  },
  but: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width / 30,
  },
  img: {
    backgroundColor: 'white',
    height: 45,
    width: 45,
    borderRadius: 100,
    marginLeft: 15,
    overflow: 'hidden',
  },
  headSub: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    width: '50%',
    flexDirection: 'row',
  },
  header: {
    backgroundColor: '#373737',
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingLeft: width / 20,
    flexDirection: 'row',
  },
});

export default connect()(Chat);
