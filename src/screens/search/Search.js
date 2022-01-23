import { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import {
  loadStart,
  loadFailure,
  loadSuccess
} from '../../redux/hotelRedux'
import axios from 'axios';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { hotelTop5, loading, error } = useSelector((state) => state.hotel);
  const [selectedValue, setSelectedValue] = useState('Guest');

  const getData = () => {
    let base_url = `http://47.254.245.112:8080/`
    dispatch(loadStart());
    axios.get(`${base_url}hotelsTop5`)
      .then((res) => {
        dispatch(loadSuccess(res.data));
      }).catch((err) => {
        console.log(err)
        dispatch(loadFailure());
      })
  }

  const _onPressButton = () => {
    alert('You tapped the button!');
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View className="container-search">
        <View style={styles.inputView}>
          <MaterialIcons name="search" size={20} style={styles.icon} />
          <TextInput
            style={styles.TextInput}
            placeholder="Where do you want to go?"
            placeholderTextColor="white"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.datePickContainer}>
          <View style={styles.dateInput}>
            <MaterialIcons
              name="calendar-today"
              size={20}
              style={styles.icon}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Check-in"
              placeholderTextColor="white"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.dateInput}>
            <MaterialIcons
              name="calendar-today"
              size={20}
              style={styles.icon}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Check-out"
              placeholderTextColor="white"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <MaterialIcons
            name="person-outline"
            size={20}
            style={styles.icon}
          />
          <Picker
            selectedValue={selectedValue}
            style={styles.pickerSelect}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item
              label="Guest"
              value="guest"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Guest1"
              value="guest2"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.titleCategory}>Top Destinations</Text>
        <ScrollView
          style={styles.placeWrap}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            loading ? <Text>Loading...</Text>
              : hotelTop5.length !== 0 ?
                hotelTop5.map((data, index) => (
                  <TouchableHighlight
                    style={styles.placeItem}
                    key={index}
                    onPress={_onPressButton}
                    underlayColor="white"
                  >
                    <>
                      <Image
                        style={styles.itemImage}
                        source={{
                          uri: `${data?.image}`,
                        }}
                      />
                      <Text style={styles.titlePlace}>{data?.hotel_name}</Text>
                    </>
                  </TouchableHighlight>
                )) : <Text>Data tidak tersedia</Text>
          }
        </ScrollView>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.titleCategory}>Popular Destinations</Text>
        <ScrollView
          style={styles.placeWrap}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            loading ? <Text>Loading...</Text>
              : hotelTop5.length !== 0 ?
                hotelTop5.map((data, index) => (
                  <TouchableHighlight
                    style={styles.placeItem}
                    key={index}
                    onPress={_onPressButton}
                    underlayColor="white"
                  >
                    <>
                      <Image
                        style={styles.itemImage}
                        source={{
                          uri: `${data?.image}`,
                        }}
                      />
                      <Text style={styles.titlePlace}>{data?.hotel_name}</Text>
                    </>
                  </TouchableHighlight>
                )) : <Text>Data tidak tersedia</Text>
          }
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  inputView: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    width: '100%',
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  TextInput: {
    height: 50,
    padding: 10,
  },
  datePickContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '48%',
    backgroundColor: 'tomato',
    borderRadius: 5,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerSelect: {
    height: '100%',
    width: '90%',
    color: 'white',
  },
  loginBtn: {
    width: '100%',
    borderRadius: 99,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'red',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleCategory: {
    fontSize: 20,
    fontWeight: '700',
  },
  placeWrap: {
    maxWidth: '100%',
    marginTop: 10,
    height: 120,
  },
  placeItem: {
    marginRight: 10,
    width: 120,
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    position: 'absolute',
  },
  titlePlace: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    color: 'white',
  },
});

export default SearchScreen;
