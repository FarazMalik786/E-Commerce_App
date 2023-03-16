import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import MainScreen from './Screens/MainScreen';
import Product_Detail from './Screens/Product_Detail';
import Categories_Product_List from './Screens/Categories_Product_List';
import User_Info from './Screens/User_Info';
import Bag from './Screens/Bag';
import { Provider } from 'react-redux';
import { mystore } from './Redux/Store';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Provider store={mystore}>
        <Stack.Navigator >

          <Stack.Screen name='loginscreen' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='signupscreen' component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name='user_info' component={User_Info} options={{ headerShown: false }} />
          <Stack.Screen name='mainscreen' component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name='product_detail' component={Product_Detail} options={{ headerShown: false }}/>
          <Stack.Screen name='categories_product_list' component={Categories_Product_List} options={{ headerShown: false }}/>
          <Stack.Screen name='bag' component={Bag} options={{ headerShown: false }} />
        </Stack.Navigator>
      </Provider>
      <StatusBar style="dark"/>
    </NavigationContainer>

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
