import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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

const FavoritesScreen = (props) => {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const [dataWishlist, setDataWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const getWishlist = () => {
    if (user.id_user !== '') {
      setLoading(true);
      axios.get(`${API.base_url}wishlists/idUser/${user.id_user}`)
        .then((res) => {
          setDataWishlist(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setDataWishlist([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setDataWishlist([]);
    }
  }

  const removeWishlist = (data) => {
    axios.delete(`${API.base_url}wishlists/idWishlist/${data.id_wishlist}/delete`)
      .then((res) => {
        alert(`${data?.hotel_name} successfully remove from wishlist`);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
        alert(`${data?.hotel_name} failed remove from wishlist`)
      });
  }

  const handleLogin = () => {
    navigation.navigate('Profiles');
  }

  useEffect(() => {
    getWishlist();
  }, [user, reload]);

  useEffect(() => {
    getWishlist();
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
            dataWishlist.length !== 0 ?
              dataWishlist.map((data) => (
                <View key={data.id_wishlist}>
                  <Card>
                    <Card.Title>{data.hotel_name}</Card.Title>
                    <Card.Divider />
                    <Card.Image
                      style={{ padding: 0 }}
                      source={{
                        uri: `${data?.image}`,
                      }}
                    />
                    <Text style={{ marginBottom: 10 }}>
                      {data?.hotel_description}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => removeWishlist(data)}
                      >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                          remove from wishlist
                        </Text>
                      </TouchableOpacity>
                    </View>
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

export default FavoritesScreen;
