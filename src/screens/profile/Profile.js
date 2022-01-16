import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  updateUser,
} from '../../redux/userRedux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  innerContainer: {
    padding: 10,
    borderBottomColor: 'black',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  inputView: {
    backgroundColor: "tomato",
    borderRadius: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 5,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },

  loginText: {
    color: 'white',
    fontSize: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  buttonOpen: {
    backgroundColor: "tomato",
  },

  buttonClose: {
    backgroundColor: "red",
    padding: 10
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataUser, setDataUser] = useState(user);

  const handleLogout = () => {
    dispatch(logout());
    props.navigation.navigate('Login');
  }

  const handleLogin = () => {
    props.navigation.navigate('Login');
  }

  const handleUpdate = (data) => {
    dispatch(updateUser(data));
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
                  placeholderTextColor="white"
                  value={dataUser?.firstName}
                  onChangeText={(value) => setDataUser({
                    ...dataUser,
                    firstName: value
                  })}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>Last Name</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your last name"
                  placeholderTextColor="white"
                  value={dataUser?.lastName}
                  onChangeText={(value) => setDataUser({
                    ...dataUser,
                    lastName: value
                  })}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>Email</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your email"
                  placeholderTextColor="white"
                  value={dataUser?.email}
                  onChangeText={(value) => setDataUser({
                    ...dataUser,
                    email: value
                  })}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.inputView}>
                <Text style={styles.icon}>Gender</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder="your gender"
                  placeholderTextColor="white"
                  value={dataUser?.gender}
                  onChangeText={(value) => setDataUser({
                    ...dataUser,
                    gender: value
                  })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpdate(dataUser)}
            >
              <Text style={styles.loginText}>
                Update Data
              </Text>
            </TouchableOpacity>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                We believe you should be able to make informed decisions about your personal data.  This Privacy Policy explains what kind of personal data PT Ojo Indonesia and its affiliates ("Ojo", "us", "we", or "our") collect, why we collect it, how we use it, with whom we share it, and what we do to protect it, both through our website www.ojorooms.com and Ojo Rooms mobile app (the "Site").
                Personal data here refers to any information which are related to an identified or identifiable natural person ("Personal Data"). Personal Data includes data that directly identifies you — such as your  name, address, date of birth, occupation, phone number, e-mail address, bank account and credit-card details, gender, identification or other government issued identifier of our users and non-users in your mobile phonebook, health data, financial related information, and biometric information; including other information or data that can indirectly and reasonably be used to identify you — such as the serial number of your device.
                Please take a moment to familiarize yourself with our Privacy Policies, accessible via the headings below, and contact us if you have any questions.
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
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
