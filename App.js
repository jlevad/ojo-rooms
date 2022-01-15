import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './src/Main';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainPage />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
