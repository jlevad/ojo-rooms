import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DetailHotel from './screens/detail-hotels/DetailHotel';
import FavoritesScreen from './screens/favorites/Favorites';
import LoginScreen from './screens/login/LoginScreen';
import ProfileScreen from './screens/profile/Profile';
import SearchScreen from './screens/search/Search';
import SettingsScreen from './screens/settings/Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

const SearchStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailHotel} />
    </Stack.Navigator>
  );
}

const MainPage = () => {
  return (
    <Tab.Navigator
      initialRouteName='Searchs'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Searchs') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Wishlists') {
            iconName = focused ? 'favorite' : 'favorite-outline';
          } else if (route.name === 'Profiles') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Searchs" component={SearchStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Wishlists" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profiles" component={ProfileStackScreen} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Login" component={LoginScreen} /> */}
    </Tab.Navigator>
  )
}

export default MainPage;
