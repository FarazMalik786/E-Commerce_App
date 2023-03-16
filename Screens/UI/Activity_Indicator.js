import React from 'react'
import { ActivityIndicator , View} from 'react-native'

function Activity_Indicator() {
  return (
    <View style={{flex:1,justifyContent:"center" , alignItems:"center"}}>
      <ActivityIndicator color="#ff4500" size="large" />
    </View>
  )
}

export default Activity_Indicator
