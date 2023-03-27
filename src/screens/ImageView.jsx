import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'

const ImageView = ({ route }) => {
    const { image } = route.params;
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image } />
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