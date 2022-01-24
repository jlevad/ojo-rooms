import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const BookingDialog = (props) => {

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text>Booking dialog</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => props.setModalVisible(!props.modalVisible)}
        >
          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableOpacity>
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
  button: {
    borderRadius: 5,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "red",
    padding: 10
  },
})

export default BookingDialog;
