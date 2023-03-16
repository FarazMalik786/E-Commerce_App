import axios from 'axios';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, useWindowDimensions, ActivityIndicator, Alert } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Custom_Button from './UI/Custom_Button'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../Config';
import { Add_Data } from '../Firebase/FireStore';
import { Basic_Info } from '../Redux/Basic_Info';
import { useDispatch } from 'react-redux';



function SignupScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { name, age, phonenumber } = route.params;
  const [input, setinput] = useState({
    email: "",
    password: "",
    cofirmpassword: "",
  })
  const [isLoading , setisLoading] = useState(false);
  const { height, width } = useWindowDimensions();

  const isPortrait = height <= width;
  


  function presshandler() {
    if (name == "" || age == "" || phonenumber == "") {
      Alert.alert("Enter valid Basic Information");
    } else if (input.email == "" || input.password == "" || input.cofirmpassword == "" || input.password != input.cofirmpassword) {
      Alert.alert("Invalid Email Or Password");
    } else {
      setisLoading(true);
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then( (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // add data in firebase
           Add_Data(user.uid, user.email, "Basic_Info", { Id: user.uid , Email_Id: user.email , Name: name, Age: age, Phonenumber: phonenumber });
          
           dispatch(Basic_Info({ id: user.uid, email_id: user.email }));
          
          if (user.uid != undefined) {
            navigation.replace("mainscreen");
          }else{
            setisLoading(false);
            Alert.alert("SomeThing Wronge please try again later");
            
        }
          
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
          setisLoading(false)
          // ..
        });
    }
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.login}>SIGN UP</Text>
      <TextInput
        onChangeText={(v) => {
          setinput(previousState => {
            return { ...previousState, email: v }
          });
        }}
        value={input.email}
        style={[Styles.textinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
        placeholder="Email" />
      <TextInput
        onChangeText={(v) => {
          setinput(previousState => {
            return { ...previousState, password: v }
          });
        }}
        value={input.password}
        style={[Styles.textinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        onChangeText={(v) => {
          setinput(previousState => {
            return { ...previousState, cofirmpassword: v }
          });
        }}
        value={input.cofirmpassword}
        style={[Styles.textinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
        placeholder="Confirm Password"

      />

      <View style={Styles.btn}>
        <Custom_Button
          text={isLoading ? (<ActivityIndicator size={"large"} color="white"/>) : "CREATE"}
          btnheight={isPortrait ? responsiveHeight(12) : responsiveHeight(8)}
          btnwidth={isPortrait ? responsiveWidth(80) : responsiveWidth(80)}
          color="white"
          onpress={() => presshandler("mainscreen")}
          backgroundColor="#ff4500"
          borderRadius={responsiveWidth(8)} />
      </View>

    </View>
  )
}

export default SignupScreen
const Styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  login: {
    fontSize: responsiveFontSize(6),
    fontWeight: "bold",
    marginVertical: responsiveHeight(9),
    marginLeft: responsiveWidth(6)
  },
  textinput: {
    borderBottomWidth: responsiveWidth(0.5),
    borderBottomColor: "gray",
    alignSelf: "center",
    marginVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(3)
  },
  btn: {
    alignSelf: "center",
    marginVertical: responsiveHeight(7),
  },
})