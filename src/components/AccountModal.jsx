import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import firebase from 'firebase/app'
// import 'firebase/app'
import { auth } from './StorageConfig'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'



GoogleSignin.configure({
    webClientId: '221892027600-os3ahi2d8gpnhfabasqurmt7bmldhgq7.apps.googleusercontent.com'
})

const AccountModal = ({ isVisible, onClose }) => {

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();



        // // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken)
        console.log('test')
        console.log(googleCredential)

        // // Sign-in the user with the credential
        // const user_sign_in= firebase.auth().signInWithCredential(googleCredential)
        // user_sign_in.then((user)=>{
        //     console.log(user)
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
        
        const result=await signInWithCredential(googleCredential)
        console.log(result)
    }
    

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onClose} style={styles.container} >
                        <Icon style={styles.icon}
                            name='close'
                            size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container} onPress={onGoogleButtonPress} >
                        <Icon style={styles.icon}
                            name='login'
                            size={20}
                        />
                        <Text>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        flex: 1,
        flexDirection: 'row'
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    icon: {
        margin: 10
    }


})

export default AccountModal