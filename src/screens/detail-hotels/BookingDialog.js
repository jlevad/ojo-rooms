import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import API from '../../api.json';

const BookingDialog = (props) => {
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(new Date());
  const [showCheckin, setShowCheckin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalGuest, setTotalGuest] = useState('');
  const { user } = useSelector(state => state.user);
  const hotel = props.hotel;

  const onChangeCheckin = (event, selectedDate) => {
    const currentDate = selectedDate || checkin;
    // setShow(Platform.OS === 'ios');
    setCheckin(currentDate);
    setShowCheckin(false);
  };
  const onChangeCheckout = (event, selectedDate) => {
    const currentDate = selectedDate || checkout;
    // setShow(Platform.OS === 'ios');
    setCheckout(currentDate);
    setShowCheckout(false);
  };

  const handleBooking = () => {
    let body = {
      id_hotel: hotel.id_hotel,
      id_user: user.id_user,
      checkin: moment(checkin).format('yyyy-MM-DD') || null,
      checkout: moment(checkout).format('yyyy-MM-DD') || null,
      total_guest: parseInt(totalGuest) || 0,
    }

    axios.post(`${API.base_url}bookings/add`, body)
      .then((res) => {
        alert(`booking success`);
      }).catch((err) => {
        alert(`booking failed, ${err}`);
      })
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ margin: 10, width: '100%' }}>
          <Text style={styles.title}>Set Booking</Text>
          <Divider width={5} color='red' />
          <Text style={{ margin: 5, fontSize: 18 }}>hotel name: {hotel.hotel_name}</Text>
          <Text style={{ margin: 5, fontSize: 18 }}>booking by: {user.firstname}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="total guest"
              placeholderTextColor="white"
              style={styles.TextInput}
              keyboardType='number-pad'
              value={totalGuest}
              onChangeText={setTotalGuest}
            />
          </View>
          <View style={styles.checkinout}>
            <View style={styles.check}>
              <Text>Checkin</Text>
              <TextInput
                placeholder="checkin"
                placeholderTextColor="white"
                defaultValue={moment(checkin).format('YYYY-MM-DD')}
                editable={false}
                style={{ color: 'red', fontSize: 18 }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCheckin(true)}
              >
                <MaterialIcons name='date-range' size={20} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.check}>
              <Text>Checkout</Text>
              <TextInput
                placeholder="checkin"
                placeholderTextColor="white"
                defaultValue={moment(checkout).format('YYYY-MM-DD')}
                editable={false}
                style={{ color: 'red', fontSize: 18 }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCheckout(true)}
              >
                <MaterialIcons name='date-range' size={20} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.buttonBooking]}
            onPress={() => handleBooking()}
          >
            <Text style={{ color: 'white' }}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.setModalVisible(!props.modalVisible)}
          >
            <Text style={{ color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {showCheckin && (
          <DateTimePicker
            testID="dateTimePicker"
            value={checkin}
            minimumDate={new Date()}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={onChangeCheckin}
          />
        )}
        {showCheckout && (
          <DateTimePicker
            testID="dateTimePicker"
            value={checkout}
            minimumDate={checkin}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={onChangeCheckout}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '100%',
    height: '100%',
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
  card: {
    alignItems: "center",
    padding: 10,
    margin: 20,
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
  checkinout: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  check: {
    margin: 5,
    flexDirection: 'row'
    // backgroundColor: 'yellow',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  inputView: {
    backgroundColor: "tomato",
    borderRadius: 5,
    width: "90%",
    height: 45,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
    width: '100%'
  },
  icon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  button: {
    borderRadius: 5,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  buttonBooking: {
    borderRadius: 5,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'green',
    padding: 10
  },
  buttonClose: {
    backgroundColor: "red",
    padding: 10
  },
})

export default BookingDialog;
