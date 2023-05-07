import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import FastImage from 'react-native-fast-image'

const AllList = ({ storageList, navigation, navFrom, refreshing, onRefresh }) => {
  const allData = [].concat(...storageList.map(item => item.data))
  // console.log('allData:', allData)

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          console.log('index', index)

          navigation.navigate('ImageDetail', { images: allData, initialItem: item, navFrom: navFrom })
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
      style={styles.container}
      data={allData}
      onRefresh={onRefresh}
      refreshing={refreshing}
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
  container: {
    height: '100%'
  }
});

export default AllList