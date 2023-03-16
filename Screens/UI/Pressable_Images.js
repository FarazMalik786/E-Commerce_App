import React from 'react'
import { Image, Pressable, Text , View} from 'react-native'


function Pressable_Images({image_url , image_height , image_width, image_borderradius , image_resizemode , press}) {
  return (
    <Pressable onPress={press} style={({pressed})=> pressed? {opacity:0.25}:{opacity:1}}>
      <Image 
      source={{uri: image_url}} 
      resizeMode= {image_resizemode}
      
      style={
        {
        height: image_height,
        width: image_width,
        borderRadius: image_borderradius,
        }}/>
    </Pressable>
  )
}

export default Pressable_Images
