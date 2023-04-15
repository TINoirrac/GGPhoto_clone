import { View, Text } from 'react-native'
import React from 'react'

const DateList = ({ storageList }) => {
    allData = [].concat(...storageList.map(item => item.data))
    console.log('allData:', allData)
    const renderItem = ({ item, index }) => {

        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                    console.log('index', index)

                    navigation.navigate('ImageDetail', { images: allData, initialIndex: index })
                }}>
                    <Image source={{ uri: item }} style={styles.itemImage} />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        {
            afterAll.map((item, index) => {

                return(<FlatList
                    data={allData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    numColumns={4}
                    contentContainerStyle={styles.gridContainer}
                />)
            })
        }
    )
}

export default DateList