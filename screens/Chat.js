import React, {Component, Fragment} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {Icon} from 'native-base';

const {width} = Dimensions.get('window');

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      invited: false,
      friendData: {},
    };
  }
  componentDidMount = async () => {
    await this.setState({friendData: this.props.navigation.state.params});

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  };

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  renderSend(props) {
    return (
      <Send {...props} containerStyle={{marginRight: 10, marginBottom: 10}}>
        <Icon
          type="MaterialCommunityIcons"
          name="send"
          style={{color: '#004DAA'}}
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

  render() {
    const {friendData} = this.state;
    return (
      <Fragment>
        {/* Overlay Notif */

        this.state.invited === false ? null : (
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <View style={styles.inv}>
                <Text>Has invited you</Text>
              </View>
              <View style={styles.buttonMenu}>
                <View style={styles.butJoin}>
                  <TouchableOpacity activeOpacity={0.9}>
                    <Text
                      style={{color: 'red', fontSize: 16, fontWeight: '700'}}>
                      Decline
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.butJoin}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.butAccept}>
                    <Text
                      style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        {/* Overlay Notif END */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Maps')}>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: 'white', fontSize: 18}}
            />
          </TouchableOpacity>

          <View style={styles.headSub}>
            <View style={styles.img}>
              <Image source={{uri: friendData.photo}} style={styles.image} />
            </View>
            <View style={styles.sub}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                {friendData.username}
              </Text>
              <Text style={{color: 'white'}}>Online</Text>
            </View>
          </View>
          <View style={styles.but}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={{fontSize: 18, color: '#00c91e'}}>Invite</Text>
            </TouchableOpacity>
          </View>
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
              _id: 1,
            }}
            // onInputTextChanged={value => this.setState({text: value})}
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

export default Chat;
