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
} from '../../redux/hotels/Top5Redux'
import {
  loadHotelsStart,
  loadHotelsFailure,
  loadHotelsSuccess
} from '../../redux/hotels/HotelsRedux'
import axios from 'axios';
import ListHotels from './ListHotels';

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const { hotelTop5, loading, error } = useSelector((state) => state.top5);
  const { hotels, loadingHotels } = useSelector((state) => state.hotels);
  const [selectedValue, setSelectedValue] = useState('Guest');
  const [searchValue, setSearchValue] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [diplaySearch, setDisplaySearch] = useState(false);
  const base_url = `http://47.254.245.112:8080/`

  const getDataTop5 = () => {
    dispatch(loadStart());
    axios.get(`${base_url}hotelsTop5`)
      .then((res) => {
        dispatch(loadSuccess(res.data));
      }).catch((err) => {
        console.log(err)
        dispatch(loadFailure());
      })
  }

  const getAllData = () => {
    dispatch(loadHotelsStart());
    axios.get(`${base_url}hotels`)
      .then((res) => {
        dispatch(loadHotelsSuccess(res.data));
      }).catch((err) => {
        console.log(err)
        dispatch(loadHotelsFailure());
      })
  }

  const handleSearch = () => {
    setLoadingSearch(true);
    if (searchValue !== '') {
      setDisplaySearch(true);
      axios.get(`${base_url}hotels/search/${searchValue}`)
        .then((response) => {
          setDataSearch(response.data);
          setLoadingSearch(false);
        })
        .catch((err) => {
          setDataSearch([]);
          setLoadingSearch(false);
          alert(err);
        })
    } else {
      alert('Value search is Empty!')
      setDisplaySearch(false);
    }
  }

  useEffect(() => {
    getDataTop5();
    getAllData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View className="container-search">
        <View style={styles.inputView}>
          <MaterialIcons name="search" size={20} style={styles.icon} />
          <TextInput
            style={styles.TextInput}
            placeholder="Search Hotels"
            placeholderTextColor="white"
            onChangeText={setSearchValue}
            value={searchValue}
          // keyboardType="email-address"
          />
        </View>
        {/* <View style={styles.datePickContainer}>
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
        </View> */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleSearch}
        >
          <Text style={styles.loginText}>Search</Text>
        </TouchableOpacity>
      </View>
      {
        diplaySearch ?
          <ListHotels
            title="Search Results"
            data={dataSearch}
            loading={loadingSearch}
            navigation={props.navigation}
          /> : null
      }
      <ListHotels
        title="Top 5 Hotels"
        data={hotelTop5}
        loading={loading}
        navigation={props.navigation}
      />
      <ListHotels
        title="All Hotels"
        data={hotels}
        loading={loadingHotels}
        navigation={props.navigation}
      />
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
    marginTop: 5,
    backgroundColor: 'red',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SearchScreen;
