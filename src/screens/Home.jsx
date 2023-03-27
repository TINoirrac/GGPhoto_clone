import { View, Text, SectionList, Image, ScrollView, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FloatingButton from '../components/FloatingButton'
import { launchImageLibrary } from 'react-native-image-picker'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack=createNativeStackNavigator()

const DATA = [
  {
    title: 'Movies',
    data: []
  },
  {
    title: 'Pictures',
    data: [
      {
        list: ['https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png']
      }
    ]
  }
]

const Home = ({ navigation }) => {
  const [media, setMedia] = useState(null)
  const handlerPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200
      },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setMedia(response.uri)
          console.log(response.uri)
          DATA[1].data[0].list.push(response.uri)
          console.log(DATA[1].data)
        }
      }
    )
  }
  const renderSectionHeader = ({ section }) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item }} style={styles.itemImage} />
      </View>
    );
  };
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={renderSectionHeader}
        renderItem={({ item }) => {
          console.log(item.list)
          return (
            <View style={styles.row}>
              <FlatList
                data={item.list}
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index}
                numColumns={4}
                contentContainerStyle={styles.gridContainer}
              />
            </View>
          );
        }}
      />
      <FloatingButton onPress={handlerPress} text='+' />
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  item: {
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

export default Home