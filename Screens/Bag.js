import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Get_Data, Update_Data_Add, Update_Data_Subtract, Remove_CartItem } from '../Firebase/FireStore';
import { Update_Data } from '../Firebase/FireStore';
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../Config";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Custom_Button from './UI/Custom_Button';
import { product_Quantity_Add, product_Quantity_Subtract, fetchUserCart } from '../Redux/Cart_Info';



function Bag() {
  const [items, setitems] = useState(0);
  const [totalvalue, settotalvalue] = useState(0)
  const { height, width } = useWindowDimensions();
  const isportrait = height <= width;

  const profile = useSelector((state) => state.cart_information);
  const dispatch = useDispatch();
  const profile1 = useSelector((state) => state.user_information);
  

  useEffect(() => {
    let Cart_Total_value = 0;
    let Cart_Total_Itams = 0;
    profile.forEach(element => {
      Cart_Total_value += element.Quantity * element.Price;
      Cart_Total_Itams += element.Quantity
    });
    setitems(Cart_Total_Itams);
    settotalvalue(Cart_Total_value.toFixed(2));
  })

  function RenderItem({ item, index }) {
    if (item.Quantity == 0) {
      Remove_CartItem(profile1.Id, profile1.Email_Id, item.Unique_Id);
      dispatch(fetchUserCart({ userId: profile1.Id, email_id: profile1.Email_Id }));
    }

    async function Product_Btn_Add() {
    
      await Update_Data_Add(profile1.Id, profile1.Email_Id, item.Unique_Id, item.Quantity).then(() => {
        dispatch(product_Quantity_Add({ Index: index }));
      }).catch(() => {
        Alert.alert("Something Wrong , Please try Again Later");
      })

    }
    async function Product_Btn_Subtract() {
     
      await Update_Data_Subtract(profile1.Id, profile1.Email_Id, item.Unique_Id, item.Quantity).then(() => {
        dispatch(product_Quantity_Subtract({ Index: index }));
      }).catch(() => {
        Alert.alert("Something Wrong , Please try Again Later");
      })

    }
    return <View style={{ alignItems: "center" }}>
      <View style={{
        flexDirection: "row", backgroundColor: "white", alignItems: "center", padding: responsiveWidth(1),
        width: isportrait ? responsiveWidth(95) : responsiveWidth(95), height: isportrait ? responsiveHeight(40) : responsiveHeight(15)
      }}>
        <Image
          source={{ uri: item.Image }}
          style={{ width: isportrait ? responsiveWidth(15) : responsiveWidth(20), height: isportrait ? responsiveHeight(20) : responsiveHeight(10) }}
          resizeMode="stretch"
        />
        <View style={{
          padding: responsiveWidth(1), justifyContent: "space-around", paddingLeft: responsiveWidth(3),
          width: isportrait ? responsiveWidth(70) : responsiveWidth(70), height: isportrait ? responsiveHeight(30) : responsiveHeight(10)
        }}>
          <Text>{item.Title.substring(0, 20) + "....."}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Custom_Button text="+" backgroundColor="#ff4500" borderRadius={responsiveWidth(2)} color="white" btnwidth={isportrait ? responsiveWidth(5) : responsiveWidth(5)} onpress={Product_Btn_Add} />
              <Text style={{ marginHorizontal: responsiveWidth(2) }}>{item.Quantity}</Text>
              <Custom_Button text="-" backgroundColor="#ff4500" borderRadius={responsiveWidth(2)} color="white" btnwidth={isportrait ? responsiveWidth(5) : responsiveWidth(5)} onpress={Product_Btn_Subtract} />
            </View>
            <Text>{"$ " + item.Price * item.Quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  }
  return (
    <View style={Style.container}>
      {isportrait ? null : <Text style={Style.headline}>My Bag</Text>}
      <FlatList
        data={profile}
        keyExtractor={item => item.Id}
        renderItem={RenderItem}
        ItemSeparatorComponent={() => {
          return <View style={{ height: responsiveHeight(2) }} />
        }}
      />

      { items > 0 && <View style={[Style.buynow_section, { width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait ? responsiveHeight(20) : responsiveHeight(15) }]}>
        <Text >Bag Item({items})</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Total amount :</Text>
          <Text style={{ color: "green" }}>{"$ " + totalvalue}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Custom_Button text="Buy Now" backgroundColor="#ff4500" color="white"
            btnwidth={isportrait ? responsiveWidth(5) : responsiveWidth(80)}
            btnheight={isportrait ? responsiveHeight(5) : responsiveHeight(5)}
            borderRadius={responsiveWidth(3)}

          />
        </View> 
      </View>}
      
    </View>
  )
}

export default Bag
const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    fontSize: responsiveFontSize(7),
    fontWeight: "bold",
    marginVertical: responsiveHeight(6)
  },
  buynow_section: {
    backgroundColor: "white",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    justifyContent: "space-evenly",
  },
})