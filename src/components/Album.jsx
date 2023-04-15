import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const Album = ({ albumData, onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}
            >
                <Image source={{ uri: albumData.coverUri }} style={styles.corverImage} />
                <Text style={styles.albumTitle}>{albumData.title}</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    corverImage: {
        width: '100%',
        height: 150,
    },
    albumTitle: {
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
})

export default Album