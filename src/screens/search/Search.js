import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Picker,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import data from './data.json';

const SearchScreen = () => {
  const [selectedValue, setSelectedValue] = useState('Guest');
  const _onPressButton = () => {
    alert('You tapped the button!');
  };
  return (
    <>
      <View style={styles.container}>
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
        <View className="container-top-place" style={{ marginTop: 40 }}>
          <Text style={styles.titleCategory}>Top Destinations</Text>
          <ScrollView
            style={styles.placeWrap}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {data.result &&
              data.category.top.map((res, i) => (
                <TouchableHighlight
                  style={styles.placeItem}
                  key={i}
                  onPress={_onPressButton}
                  underlayColor="white"
                >
                  <>
                    <Image
                      style={styles.itemImage}
                      source={{
                        uri: `${res.image}`,
                      }}
                    />
                    <Text style={styles.titlePlace}>Roma</Text>
                  </>
                </TouchableHighlight>
              ))}
          </ScrollView>
        </View>
        <View className="container-popular-place" style={{ marginTop: 20 }}>
          <Text style={styles.titleCategory}>Popular Destinations</Text>
          <ScrollView
            style={styles.placeWrap}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {data.result &&
              data.category.top.map((res, i) => (
                <TouchableHighlight
                  style={styles.placeItem}
                  key={i}
                  onPress={_onPressButton}
                  underlayColor="white"
                >
                  <>
                    <Image
                      style={styles.itemImage}
                      source={{
                        uri: `${res.image}`,
                      }}
                    />
                    <Text style={styles.titlePlace}>Roma</Text>
                  </>
                </TouchableHighlight>
              ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 18,
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
