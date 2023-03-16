import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import { Animated, Image, ImageBackground, StatusBar, StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Bag from './Bag';
import Profile from './Profile';
import SearchScreen from './SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Categories from './MainScreen_Component/Categories';
import axios from 'axios';
import Products_List from './MainScreen_Component/Products_List';
import Activity_Indicator from './UI/Activity_Indicator';


const Tab = createBottomTabNavigator();

function Main({ navigation }) {
  const [mensclothing, setmensclothing] = useState([]);
  const [womensclothing, setwomensclothing] = useState([]);
  const [electronics, setelectronics] = useState([]);
  const [jewelery, setjewelery] = useState([]);
  const [isLoading , setisLoading] = useState(true);

  {/* Portrait mode onn or off*/ }
  const { height, width } = useWindowDimensions();
  const isportrait = height <= width;
  useEffect(() => {
    try {
      (async () => {
        const response_mensclothing = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
        const response_womensclothing = await axios.get("https://fakestoreapi.com/products/category/women's clothing");
        const response_electronics = await axios.get("https://fakestoreapi.com/products/category/electronics");
        const response = await axios.get("https://fakestoreapi.com/products/category/jewelery");
        setmensclothing(response_mensclothing.data);
        setwomensclothing(response_womensclothing.data);
        setelectronics(response_electronics.data);
        setjewelery(response.data);
       setisLoading(false);
      })()
    } catch (error) {
      console.log(error);
    }

  }, []);

  if (isLoading) {
    return <Activity_Indicator/>
  }
  return (

    <ScrollView style={Styles.container} nestedScrollEnabled={true}>
      <StatusBar translucent={false} />

      {/* Image */}
      <Image
        source={{ uri: "https://img.freepik.com/free-photo/young-handsome-man-choosing-clothes-shop_1303-19720.jpg?w=2000" }}
        style={{ width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait ? responsiveHeight(100) : responsiveHeight(60) }}

      />
      {/* Categories */}
      <View style={{ width: responsiveWidth(100), height: isportrait ? responsiveHeight(50) : responsiveHeight(30), justifyContent: "center" }}>
        <Categories navigation={navigation} />
      </View>
      {/* men's clothing */}
      <View style={{height: isportrait? responsiveHeight(95): responsiveHeight(35) , width: isportrait? responsiveWidth(100) : responsiveWidth(100), backgroundColor:"white"}}>
        <Text style={Styles.Categories_Title}>MEN'S CLOTTHING</Text>
        <Products_List listdata={mensclothing}
          product_item_height={isportrait ? responsiveHeight(70) : responsiveHeight(20)}
          product_item_width={isportrait ? responsiveWidth(45) : responsiveWidth(45)}
          product_item_container_width={responsiveWidth(50)}
          horizontal={true}
          navigation={navigation}
        />
      </View>
      {/* image */}
      <Image
      source={{uri:"https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/Ecommerce-website-design.jpg?auto=format&q=60&w=1860&h=1395&fit=crop&crop=faces"}}
      style={{ width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait ? responsiveHeight(100) : responsiveHeight(60) }}
      resizeMode="stretch"
      />
      {/* women's clothing */}
      <View style={{height: isportrait? responsiveHeight(125): responsiveHeight(60) , width: isportrait? responsiveWidth(100) : responsiveWidth(100), backgroundColor:"white"}}>
        <Text style={Styles.Categories_Title}>WOMEN'S CLOTTHING</Text>
        <Products_List listdata={womensclothing}
          product_item_height={isportrait ? responsiveHeight(50) : responsiveHeight(20)}
          product_item_width={isportrait ? responsiveWidth(30) : responsiveWidth(28)}
          product_item_container_width={responsiveWidth(33)}
          numcolumn={3}
          navigation={navigation}
          
        />
      </View>
      {/* jewwllery*/}
      <View >
        <Text style={Styles.Categories_Title}>JEWELERY</Text>
        
          <Products_List listdata={jewelery}
            product_item_height={isportrait ? responsiveHeight(70) : responsiveHeight(40)}
            product_item_width={isportrait ? responsiveWidth(60) : responsiveWidth(90)}
            product_item_borderradius={responsiveWidth(10)}
            product_item_container_width={responsiveWidth(100)}
            horizontal={true}
            navigation={navigation}
          />
      
      </View>
       {/* electronics */}
       <View style={{height: isportrait? responsiveHeight(95): responsiveHeight(35) , width: isportrait? responsiveWidth(100) : responsiveWidth(100), backgroundColor:"white"}}>
        <Text style={Styles.Categories_Title}>ELECTRONICS</Text>
        <Products_List listdata={electronics}
          product_item_height={isportrait ? responsiveHeight(70) : responsiveHeight(20)}
          product_item_width={isportrait ? responsiveWidth(45) : responsiveWidth(45)}
          product_item_container_width={responsiveWidth(50)}
          horizontal={true}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  )
}
function MainScreen() {

  return (

    <Tab.Navigator screenOptions={{ tabBarShowLabel: false , tabBarInactiveTintColor:"grey" , tabBarActiveTintColor:"#ff4500"}}>
      <Tab.Screen name='home' component={Main}
        options={{ headerShown: false, tabBarIcon: ({color}) => { return <MaterialCommunityIcons name="home-outline" size={24} color={color} /> } }} />
      <Tab.Screen name='search' component={SearchScreen}
        options={{ headerShown: false, tabBarIcon: ({color}) => { return <Ionicons name="search" size={24} color={color} /> } }} />
      
      <Tab.Screen name='bag' component={Bag}
        options={{ headerShown: false, tabBarIcon: ({color}) => { return <MaterialCommunityIcons name="shopping-outline" size={24} color={color} /> } }} />
      <Tab.Screen name='profile' component={Profile}
        options={{ headerShown: false, tabBarIcon: ({color}) => { return <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} /> } }} />
    </Tab.Navigator>

  )
}

export default MainScreen
const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {

    fontSize: responsiveWidth(5),
    fontFamily: "sans-serif-light",
    marginLeft: responsiveWidth(28),
  },
  Categories_Title: {
    textAlign: "center",
    fontFamily: "sans-serif-light",
    fontSize: responsiveFontSize(4),
    marginVertical: responsiveHeight(2)
  }
})