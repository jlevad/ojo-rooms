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
import API from '../../api.json';

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
    borderRadius: 5,
    width: "90%",
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
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
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "red",
  },

  loginText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    dispatch(loginStart());
    axios.get(`${API.base_url}users/login/email/${email}/password/${password}`)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        if (props?.route?.params?.hotel) {
          props.navigation.navigate('Detail', { detail: props?.route?.params?.hotel })
        } else {
          props.navigation.navigate('Profile');
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
        console.log(err);
      })
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <MaterialIcons name='person' size={20} style={styles.icon} />
        <TextInput
          style={styles.TextInput}
          placeholder="email"
          placeholderTextColor="white"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
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
        <Text>Wrong email or password</Text>
      )}
    </View >
  )
}

export default LoginScreen;
