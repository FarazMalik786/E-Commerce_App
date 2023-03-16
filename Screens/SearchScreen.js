import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, FlatList, Pressable, Image, TextInput, Alert } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Activity_Indicator from './UI/Activity_Indicator';

function SearchScreen({ navigation }) {
  const [fetched_data, setfetched_data] = useState([]);
  const [listdata, setlistdata] = useState([]);
  const [textinput, settextinput] = useState("");

  {/* Portrait mode onn or off*/ }
  const { height, width } = useWindowDimensions();
  const [isLoading , setisLoading] = useState(true);
  const isportrait = height <= width;
  useEffect(() => {
    try {
      (async () => {

        const response = await axios.get("https://fakestoreapi.com/products");
        setlistdata(response.data)
        setfetched_data(response.data);
       setisLoading(false)

      })()
    } catch (error) {
      console.log(error)
    }
  }, []);

  if (isLoading) {
    return <Activity_Indicator/>
  }

  function List({ item, index }) {
    function navigate_product_detail() {
      navigation.navigate("product_detail", {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        rating: {
          rate: item.rating.rate,
          count: item.rating.count
        }
      });
    }
    return (
      <Pressable onPress={navigate_product_detail}>
        <View style={[Styles.product_container, { width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait ? responsiveHeight(45) : responsiveHeight(25) }]}>
          <Image source={{ uri: item.image }}
            style={{ height: isportrait ? responsiveHeight(40) : responsiveHeight(20), width: isportrait ? responsiveWidth(35) : responsiveWidth(40) }}
            resizeMode="stretch"
          />
          <View style={{ width: isportrait ? responsiveWidth(50) : responsiveWidth(50), justifyContent: "center" }}>
            <Text>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    )
  }
  return (
    <View style={Styles.container}>
      <TextInput
        style={[Styles.textinput, { width: isportrait ? responsiveWidth(80) : responsiveWidth(80), height: isportrait ? responsiveHeight(20) : responsiveHeight(10) }]}
        onChangeText={(v) => {
          settextinput(v);
          if (v == "") {
            setlistdata(fetched_data)
          }else{
            let tempList = listdata.filter(item => {
              return item.title.toLowerCase().indexOf(v.toLowerCase()) > -1;
            });
            setlistdata(tempList);
          }
        }}
        value={textinput}
        placeholderTextColor="#ff4500"
        placeholder="SEARCH"
       
      />
     
      <FlatList
        data={listdata}
        keyExtractor={item => item.id}
        renderItem={List}
        ItemSeparatorComponent={() => {
          return <View style={{ height: responsiveHeight(3) }} />
        }}

      />
    </View>
  )
}

export default SearchScreen
const Styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  product_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"

  },
  textinput: {
    borderWidth: responsiveWidth(0.5),
    borderColor: "#ff4500",
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: responsiveHeight(3),
    borderRadius: responsiveWidth(4),
    paddingLeft: responsiveWidth(9)

  }
})