import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { signInWithGoogle } from '../components/StorageConfig'

const LogIn = ({navigation}) => {

  const onSignInPress=()=>{
    signInWithGoogle().then(()=>{
      setTimeout(()=>{
        navigation.navigate('Home')
      },1000)
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <View style={style.login_button}>
      <Text style={style.header}>Cloud Photos</Text>
      <GoogleSigninButton onPress={onSignInPress} size={GoogleSigninButton.Size.Wide} />
    </View>
  )
}

const style=StyleSheet.create({
  login_button:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    paddingVertical: 12,
    marginBottom:200,
  },
})

export default LogIn