import React from 'react'
import { Text, View, StyleSheet, Pressable, useWindowDimensions, Button } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { Clear_data } from '../Redux/Basic_Info';
function Profile({ navigation }) {
  const { height, width } = useWindowDimensions();
  const isportrait = height <= width;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user_information);

  const LogOut = ()=>{
    dispatch(Clear_data());
    navigation.replace("loginscreen")
  }
  return (
    <View style={Styles.container}>
      <View style={[Styles.header, { height: isportrait ? responsiveHeight(30) : responsiveHeight(35), width: isportrait ? responsiveWidth(100) : responsiveWidth(100) }]}>
        <Text style={{ fontSize: responsiveFontSize(6), fontWeight: "bold", margin: responsiveHeight(3) }}>My Profile</Text>
        <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(3) }}>{profile.Name}</Text>
        <Text style={{ alignSelf: "center", color: "gray" }}>{profile.Email_Id}</Text>
      </View>
      <Pressable
        style={({ pressed }) => pressed ? [Styles.buttonStyle, { opacity: 0.5 }] : [Styles.buttonStyle, { opacity: 1 }]}
        onPress={LogOut}
      >
        <Text style={{ color: "white" }}>Log Out</Text>
      </Pressable>

    </View >
  )
}

export default Profile
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    backgroundColor: "white",
    justifyContent: "center",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4500",
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    marginBottom: responsiveHeight(5),
    borderRadius: responsiveWidth(10)
  }
})