import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import { Rating } from 'react-native-ratings';


const DetailHotel = (props) => {
  const hotel = props.route.params.detail;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{hotel?.hotel_name}</Text>
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
        <View style={styles.outerImage}>
          <Image
            resizeMode="contain"
            style={{ aspectRatio: 2, borderRadius: 8, }}
            // style={styles.image}
            source={{
              uri: `${hotel?.image}`,
            }}
          />
          <Text style={styles.subtitle2}>{hotel?.hotel_description}</Text>
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
    textAlign: 'center'
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
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
});

export default DetailHotel;
