import React, {Fragment} from 'react';
import {Text, Button} from 'react-native';

const More = props => {
  const logout = () => {
    props.navigation.navigate('Login');
  };
  return (
    <Fragment>
      <Text>More</Text>
      <Button onPress={logout} title="Logout" />
    </Fragment>
  );
};

export default More;
