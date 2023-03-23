import { View, Text, SectionList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'


const DATA = [
  {
    title: 'Movies',
    data: []
  },
  {
    title: 'Photos',
    data: ['https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png']
  }
]

const Home = () => {
  return (
    <View>
      <SectionList
        style={{ flexDirection: 'row' }}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View >
            <FlatList
              data={[item]}
              renderItem={({item})=><Image source={{uri:item}} style={{height:100,width:100}}/>}
              keyExtractor={(item, index) => item + index}
              horizontal={false}
              numColumns={2}
            />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text>{title}</Text>
        )}

      />
    </View>
  )
}

export default Home