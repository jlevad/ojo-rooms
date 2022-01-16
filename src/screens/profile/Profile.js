import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
} from '../../redux/userRedux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5
  },

  innerContainer: {
    padding: 10,
    borderBottomColor: 'black'
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  inputView: {
    backgroundColor: "tomato",
    borderRadius: 30,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  icon: {
    padding: 10,
    paddingRight: 0,
    width: '25%',
    alignItems: 'center',
    color: 'white'
  },

  TextInput: {
    height: 50,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },

  button: {
    borderRadius: 30,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },

  loginText: {
    color: 'white',
    fontSize: 20,
  }
});

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);

  const handleLogout = () => {
    dispatch(logout());
    props.navigation.navigate('Login');
  }

  const handleLogin = () => {
    props.navigation.navigate('Login');
  }

  return (
    <ScrollView>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>My Account</Text>
        </View>
        {user.username !== '' ?
          <>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>First Name</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your first name"
                  selectionColor="green"
                  placeholderTextColor="white"
                  editable={false}
                  value={user?.firstName}
                // onChangeText={(value) => setFirstName(value)}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>Last Name</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your last name"
                  selectionColor="green"
                  placeholderTextColor="white"
                  editable={false}
                  value={user?.lastName}
                // onChangeText={(value) => setLastName(value)}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>Email</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your email"
                  selectionColor="green"
                  placeholderTextColor="white"
                  editable={false}
                  value={user?.email}
                // onChangeText={(value) => setEmail(value)}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>Gender</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your gender"
                  selectionColor="green"
                  placeholderTextColor="white"
                  editable={false}
                  value={user?.gender}
                // onChangeText={(value) => setGender(value)}
                />
              </View>
            </View>
          </> :
          <>
            <Text style={{ textAlign: 'center', padding: 10 }}>
              Login is required
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogin()}
            >
              <Text style={styles.loginText}>
                Login
              </Text>
            </TouchableOpacity>
          </>
        }

      </ScrollView>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Support</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
        // onPress={() => dispatch(logout())}
        >
          <Text style={styles.loginText}>
            Term & Policy
          </Text>
        </TouchableOpacity>
        {
          user.username !== '' ?
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogout()}
            >
              <Text style={styles.loginText}>
                Logout
              </Text>
            </TouchableOpacity> : null
        }
      </ScrollView>
    </ScrollView>
  )
}

export default ProfileScreen;
