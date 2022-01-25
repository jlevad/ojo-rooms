import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

const ListHotels = (props) => {
  const data = props.data;
  const loading = props.loading;
  const title = props.title;

  const _onPressButton = (data) => {
    props.navigation.navigate('Detail', { detail: data });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.titleCategory}>{title}</Text>
      <ScrollView
        style={styles.placeWrap}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          loading ? <Text>Loading...</Text>
            : data?.length !== 0 && data !== 'undifined' ?
              data?.map((value, index) => (
                <TouchableHighlight
                  style={styles.placeItem}
                  key={index}
                  onPress={() => _onPressButton(value)}
                  underlayColor="white"
                >
                  <>
                    <Image
                      style={styles.itemImage}
                      source={{
                        uri: `${value?.image}`,
                      }}
                    />
                    <Text style={styles.titlePlace}>{value?.hotel_name}</Text>
                  </>
                </TouchableHighlight>
              )) : <Text>Data tidak tersedia</Text>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default ListHotels;
