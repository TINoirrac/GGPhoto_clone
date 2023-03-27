import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'

const ImageView = ({ route }) => {
    return (
        <View style={styles.container}>
            <Text>quoc</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})

export default ImageView