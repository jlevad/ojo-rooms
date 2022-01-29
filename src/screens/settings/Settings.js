import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import API from '../../api.json';

const SettingsScreen = (props) => {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const getHistory = () => {
    if (user.id_user !== '') {
      setLoading(true);
      axios.get(`${API.base_url}bookings/idUser/${user.id_user}`)
        .then((res) => {
          setDataHistory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setDataHistory([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setDataHistory([]);
    }
  }

  const handleLogin = () => {
    navigation.navigate('Profiles');
  }

  useEffect(() => {
    getHistory();
  }, [user, reload]);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <ScrollView >
      {
        user.id_user !== '' ?
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setReload(!reload)}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Refresh
              </Text>
            </TouchableOpacity>
          </View> : null
      }
      {
        user.id_user !== '' ?
          loading ?
            <View style={{ width: '100%' }}>
              <Text style={{ textAlign: 'center' }}>Loading...</Text>
            </View> :
            dataHistory.length !== 0 ?
              dataHistory.map((data) => (
                <View key={data.id_booking}>
                  <Card>
                    <Card.Title>{data.hotel_name}</Card.Title>
                    <Card.Divider />
                    <Card.Image
                      style={{ padding: 0 }}
                      source={{
                        uri: `${data?.image}`,
                      }}
                    />
                    <Text style={{ marginTop: 10 }}>
                      checkin: {moment(data?.checkin).format('yyyy-MM-DD')}
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                      checkout: {moment(data?.checkout).format('yyyy-MM-DD')}
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                      total guest: {data?.total_guest}
                    </Text>
                  </Card>

                </View>
              )) : (
                <View style={{ width: '100%' }}>
                  <Text style={{ textAlign: 'center' }}>Data tidak ditemukan</Text>
                </View>
              ) : (
            <>
              <Text style={{ textAlign: 'center', padding: 10 }}>
                Login is required
              </Text>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => handleLogin()}
              >
                <Text style={styles.loginText}>
                  Login
                </Text>
              </TouchableOpacity>
            </>
          )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    // width: '50%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  button: {
    width: '100%',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogin: {
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
});

export default SettingsScreen;
