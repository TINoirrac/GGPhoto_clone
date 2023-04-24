import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const DateList = ({ storageList,navigation,refresh }) => {
    const allData = [].concat(...storageList.map(item => item.data))
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ImageDetail', { images: allData, initialItem: item ,refresh:refresh})
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

    <View>
      <FlatList
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
        keyExtractor={(item,index)=>item+index}
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
      flex: 1/4,
      padding: 1,
      backgroundColor: '#e6e6e6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemImage: {
      width: 100,
      height: 100
    },
  });

export default DateList