import React from 'react'
import { Text, View, StyleSheet, useWindowDimensions, Image, ScrollView, Alert } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Add_Data } from '../Firebase/FireStore';
import Custom_Button from './UI/Custom_Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { async } from '@firebase/util';
import { add_to_cart, fetchUserCart } from '../Redux/Cart_Info';

function Product_Detail({ route }) {
  const { id, title, price, description, category, image, rating } = route.params;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user_information);
  const bag = useSelector((state) => state.cart_information);
  const { height, width } = useWindowDimensions();
  const isportrait = height <= width;

  async function Addtocart() {
    if (bag.length > 0) {
      var existing = false;
      // check whether the item is present in cart or not
      bag.forEach(element => {
       
        if (element.Id === id) {
          existing = true;
        }
      });
    
      //
      if (existing) {
        Alert.alert("already added");
      }
      else {
        await Add_Data(profile.Id, profile.Email_Id, "Cart", {
          Id: id,
          Title: title,
          Quantity: 1,
          Price: price,
          Description: description,
          Category: category,
          Image: image,
          Rating: rating,
        }).then(() => {
          
            dispatch(fetchUserCart({ userId: profile.Id, email_id: profile.Email_Id }));
            Alert.alert("Added Successfully");
        }).catch(() => {
          Alert.alert("unable to add , please try again later");
        })
      }
    }


    else {
      await Add_Data(profile.Id, profile.Email_Id, "Cart", {
        Id: id,
        Title: title,
        Quantity: 1,
        Price: price,
        Description: description,
        Category: category,
        Image: image,
        Rating: rating,
      }).then(() => {
        dispatch(fetchUserCart({ userId: profile.Id, email_id: profile.Email_Id }));
        Alert.alert("Added Successfully")
      }).catch(() => {
        Alert.alert("unable to add , please try again later");
      })

    }

  }
  return (
    <ScrollView style={Styles.container}>
      
      <View style={{ width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait ? responsiveHeight(100) : responsiveHeight(50), backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: image }}
          style={{ width: isportrait ? responsiveWidth(65) : responsiveWidth(80), height: isportrait ? responsiveHeight(80) : responsiveHeight(40) }}
          resizeMode="stretch"
        />
      </View>
      <Text style={Styles.title}>{title}</Text>
      <Text style={Styles.price}>$ {price}</Text>
      <View style={[Styles.btn, { height: isportrait ? responsiveHeight(40) : responsiveHeight(20) }]}>
        <Custom_Button

          btnheight={isportrait ? responsiveHeight(15) : responsiveHeight(8)}
          btnwidth={isportrait ? responsiveWidth(70) : responsiveWidth(70)}
          text="Add to Cart"
          backgroundColor="#ff4500"
          borderRadius={responsiveWidth(2)}
          color="white"
          onpress={Addtocart}
        />
        <Custom_Button

          btnheight={isportrait ? responsiveHeight(15) : responsiveHeight(8)}
          btnwidth={isportrait ? responsiveWidth(70) : responsiveWidth(70)}
          text="Buy Now"
          backgroundColor="#ff4500"
          borderRadius={responsiveWidth(2)}
          color="white"
        />
      </View>
      <View>
        <Text style={Styles.Product_Detail}>PRODUCT DETAIL :-</Text>
        <Text style={Styles.Product_Detail}>{description}</Text>
      </View>
    </ScrollView>
  )
}

export default Product_Detail
const Styles = StyleSheet.create({
  container: {
    flex: 1,

  },
 
  title: {
    fontSize: responsiveFontSize(2.5)
  },
  price: {
    fontSize: responsiveFontSize(5),
    margin: responsiveHeight(2),
    color: "green"
  },
  btn: {
    alignSelf: "center",
    justifyContent: "space-between",
  },
  Product_Detail: {
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(2.1),
  }
})