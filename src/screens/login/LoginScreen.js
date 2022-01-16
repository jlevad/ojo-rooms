import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginFailure,
  loginSuccess
} from '../../redux/userRedux'
import user from './UserDummy.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputView: {
    backgroundColor: "tomato",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
  },

  icon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },

  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "red",
  },

  loginText: {
    color: 'white'
  }
});

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    dispatch(loginStart());
    if ((username === user.username || username === user.email) && password === user.password) {
      dispatch(loginSuccess(user));
      props.navigation.navigate('Profile');
    } else {
      dispatch(loginFailure())
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <MaterialIcons name='person' size={20} style={styles.icon} />
        <TextInput
          style={styles.TextInput}
          placeholder="username / email"
          placeholderTextColor="white"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <MaterialIcons name='lock' size={20} style={styles.icon} />
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => login()}
      >
        <Text style={styles.loginText}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
      {error && (
        <Text>Wrong username or password</Text>
      )}
    </View >
  )
}

export default LoginScreen;
