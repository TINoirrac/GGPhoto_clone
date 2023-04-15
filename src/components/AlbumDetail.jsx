import { View, Text } from 'react-native'
import React from 'react'

const AlbumDetail = ({ albumData, navigation }) => {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <AllList storageList={albumData} navigation={navigation} />
        </View>
    )
}

export default AlbumDetail