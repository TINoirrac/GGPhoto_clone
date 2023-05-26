import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'


const Album = ({ albumData,navigation, }) => {
    // console.log('albumData',albumData)

    const onAlbumPress=()=>{
        navigation.navigate('AlbumDetail',{title:albumData.title})
    }
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={onAlbumPress}
            >
                {/* <Image source={{ uri: albumData.coverUri }} style={styles.corverImage} /> */}
                <Icon name='folder' size={110}/>
                <Text style={styles.albumTitle}>{albumData.title}</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    corverImage: {
        width: '100%',
        height: 100,
    },
    albumTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333'
    },
})

export default Album