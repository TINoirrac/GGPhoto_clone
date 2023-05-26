import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import CheckBox from '@react-native-community/checkbox'

const AllList = ({ allData, navigation, navFrom, refreshing, onRefresh, pressSelect,selectedImages,setSelectedImages,albumTitle }) => {

  const handleCheck = useCallback((item) => {
    const newSelectedImages = [...selectedImages]
    if (item.isChecked) {
      newSelectedImages.splice(newSelectedImages.indexOf(item), 1)
      item.isChecked = false
    } else {
      newSelectedImages.push(item)
      item.isChecked = true
    }
    setSelectedImages(newSelectedImages)
  }, [selectedImages])

  
  const renderItem = ({ item, index }) => {
    const isChecked = selectedImages.includes(item)
    // console.log('isChecked',isChecked)
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ImageDetail', { images: allData, initialItem: item, navFrom: navFrom ,albumTitle:albumTitle})
        }}>
          <FastImage
            style={styles.itemImage}
            source={{
              uri: item.uri,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}

          />
        </TouchableOpacity>
        {
          pressSelect && (
            <CheckBox
              value={isChecked}
              onValueChange={() => handleCheck(item)}
            />
          )
        }
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