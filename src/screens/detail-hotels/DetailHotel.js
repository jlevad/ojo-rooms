import axios from 'axios';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { Rating, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import BookingDialog from './BookingDialog';
import API from '../../api.json';
import { useNavigation } from '@react-navigation/native';

const DetailHotel = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const hotel = props?.route?.params?.detail;
  const [modalVisible, setModalVisible] = useState(false);

  const handleBooking = (data) => {
    if (user.id_user !== '') {
      setModalVisible(!modalVisible);
    } else {
      navigation.navigate('Profiles', { screen: 'Login', params: { hotel: data } });
    }
  }

  const handleWishlist = (data) => {
    if (user.id_user !== '') {
      let body = {
        id_wishlist: 0,
        id_hotel: data.id_hotel,
        id_user: user.id_user,
        status: "aktif"
      }
      axios.post(`${API.base_url}wishlists/add`, body)
        .then((res) => {
          alert(`${data.hotel_name} added to wishlists`)
        })
        .catch(err => alert(`failed add ${data.hotel_name} to wishlists`))
    } else {
      navigation.navigate('Profiles', { hotel: data });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{hotel?.hotel_name}</Text>
        <Divider color='red' />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={hotel?.review}
            onFinishRating={5}
            imageSize={8}
            style={{ margin: 10, }}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={styles.subtitle2}>{hotel?.city_name}</Text>
            <Text style={styles.subtitle}>{hotel?.country_name}</Text>
          </View>
        </View>
        <Divider inset={true} insetType="middle" color='red' />
        <View style={styles.outerImage}>
          <Image
            resizeMode="contain"
            style={{ aspectRatio: 2, borderRadius: 8, marginBottom: 10 }}
            // style={styles.image}
            source={{
              uri: `${hotel?.image}`,
            }}
          />
        </View>
        <Text style={styles.subtitle2}>{hotel?.hotel_description}</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleBooking(hotel)}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Bookings
              </Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <BookingDialog modalVisible={modalVisible} setModalVisible={setModalVisible} />
              </Modal>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleWishlist(hotel)}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                {hotel?.status ? 'remove from wishlist' : 'Add to wishlist'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({

  container: {
    // backgroundColor: 'blue',
  },
  innerContainer: {
    flex: 1,
    margin: 10,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 26,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 18,
    // color: 'tomato',
    fontWeight: 'bold'
  },
  subtitle2: {
    fontSize: 16,
    // color: 'tomato',
    // fontWeight: 'bold'
  },
  rating: {
    paddingVertical: 10,
  },
  outerImage: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 5,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
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
  }
});

export default DetailHotel;
