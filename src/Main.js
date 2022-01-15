import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoritesScreen from './favorites/Favorites';
import LoginScreen from './login/LoginScreen';
import ProfileScreen from './profile/Profile';
import SearchScreen from './search/Search';
import SettingsScreen from './settings/Settings';

const Tab = createBottomTabNavigator();

const MainPage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'favorite' : 'favorite-outline';
          } else if (route.name === 'Profile') {
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
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  )
}

export default MainPage;
