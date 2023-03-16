import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, useWindowDimensions , ScrollView} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Custom_Button from './UI/Custom_Button';

function User_Info( { navigation } ) {
  const [input, setinput] = useState({
    name: "",
    age: "",
    phonenumber: "",
  })

  const { height, width } = useWindowDimensions();
  const isPortrait = height <= width;


  function presshandler(screen) {
    navigation.navigate(screen , {
      name: input.name,
      age: input.age,
      phonenumber : input.phonenumber,
    });
    
}

  return (
    <ScrollView>
    <View style={Styles.container}>
      <Text style={Styles.text}>BASIC INFORMATION</Text>
      <TextInput
       onChangeText={(v) => {
        setinput(previousState => {
          return { ...previousState, name: v }
        });
      }}
      value={input.name}
      placeholder='Name'
        style={[Styles.txtinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
      />
      <TextInput
       onChangeText={(v) => {
        setinput(previousState => {
          return { ...previousState, age: v }
        });
      }}
      value={input.age}
      placeholder='Age'
      keyboardType="number-pad"
      maxLength={3}
        style={[Styles.txtinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
      />
      <TextInput
       onChangeText={(v) => {
        setinput(previousState => {
          return { ...previousState, phonenumber: v }
        });
      }}
      value={input.phonenumber}
      placeholder='Phone Number'
      keyboardType="number-pad"
        style={[Styles.txtinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
      />
      <View style={Styles.btn}>
        <Custom_Button
          text="NEXT"
          btnheight={isPortrait ? responsiveHeight(12) : responsiveHeight(8)}
          btnwidth={isPortrait ? responsiveWidth(80) : responsiveWidth(80)}
          color="white"
          onpress={() => presshandler("signupscreen")}
          backgroundColor="#ff4500"
          borderRadius={responsiveWidth(8)} />
      </View>
    </View>
    </ScrollView>
  )
}

export default User_Info
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    fontSize: responsiveFontSize(6),
    marginVertical: responsiveHeight(9),
    fontWeight: "bold"
  },
  txtinput: {
    borderBottomWidth: responsiveWidth(0.5),
    borderBottomColor: "gray",
    marginVertical: responsiveHeight(1)
  },
 btn:{
  marginVertical: responsiveHeight(2),
 }
})
