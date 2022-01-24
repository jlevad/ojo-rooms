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
import BookingDialog from './BookingDialog';


const DetailHotel = (props) => {
  const hotel = props.route.params.detail;
  const [modalVisible, setModalVisible] = useState(false);

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.subtitle}>
              Booking
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
    color: 'tomato',
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
    width: '100%',
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  button: {
    width: '100%',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center",
  }
});

export default DetailHotel;
