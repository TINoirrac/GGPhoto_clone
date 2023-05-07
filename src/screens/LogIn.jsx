import { View, Text } from 'react-native'
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
    <View>
      <GoogleSigninButton onPress={onSignInPress} size={GoogleSigninButton.Size.Wide}/>
    </View>
  )
}

export default LogIn