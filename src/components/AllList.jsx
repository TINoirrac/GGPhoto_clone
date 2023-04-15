import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const AllList = ({ storageList, navigation }) => {
  allData = [].concat(...storageList.map(item => item.data))
  console.log('allData:', allData)
  const renderItem = ({ item, index }) => {

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          console.log('index', index)

          navigation.navigate('ImageDetail', { images: allData, initialIndex: index })
        }}>
          <FastImage
            style={styles.itemImage}
            source={{
              uri: item,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}

          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={allData}
      renderItem={renderItem}
      keyExtractor={(item, index) => item + index}
      numColumns={4}
      contentContainerStyle={styles.gridContainer}
    />
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 1
  },
  item: {
    flex: 1 / 4,
    margin: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100
  },
});

export default AllList