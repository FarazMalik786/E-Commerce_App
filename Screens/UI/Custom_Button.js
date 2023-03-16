import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'


function Custom_Button({text , onpress , btnheight , btnwidth , color , backgroundColor , borderRadius}) {
  return (
    <Pressable onPress={onpress} style={({pressed})=> pressed? {opacity:0.25}:{opacity:1}}>
    <View style={[Styles.container, {height: btnheight , width: btnwidth , backgroundColor:backgroundColor , borderRadius: borderRadius}]}>
      <Text style={{color: color}}>{text}</Text>
    </View>
    </Pressable>
  )
}

export default Custom_Button
const Styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
    }
})