import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import FastImage from 'react-native-fast-image'
import CheckBox from '@react-native-community/checkbox'

const DateList = ({ storageList, navigation, navFrom, refreshing, onRefresh, pressSelect, selectedImages, setSelectedImages,onLongPress }) => {
  const allData = [].concat(...storageList.map(item => item.data))

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

    return (
      <View style={styles.item}>
        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('ImageDetail', { images: allData, initialItem: item, navFrom: navFrom })
        }}
        onLongPress={onLongPress}
        >
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

    <View>
      <FlatList
        style={styles.container}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={storageList}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.sectionHeader}>{item.title}</Text>
              <FlatList
                data={item.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index}
                numColumns={4}
                contentContainerStyle={styles.gridContainer}
              />
            </View>
          )
        }}
        keyExtractor={(item, index) => item + index}
      />
    </View>
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

  },
  item: {
    flex: 1 / 4,
    padding: 1,
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

export default DateList