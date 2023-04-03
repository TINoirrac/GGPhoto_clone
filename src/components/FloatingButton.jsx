import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const FloatingButton = ({onPress,text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
        <View>
            <Text style={styles.floatingButtonText}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    floatingButton:{
        position:'absolute',
        bottom:20,
        right:20,
        backgroundColor:'blue',
        borderRadius:50,
        width:70,
        height:70,
        justifyContent:'center',
        alignItems:'center',
    },
    floatingButtonText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    }
})

export default FloatingButton