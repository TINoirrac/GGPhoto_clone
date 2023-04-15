import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Album from '../components/Album'

const AlbumList = ({albums,onAlbumPress}) => {
  return (
    <View style={styles.albumListContainer}>
      <FlatList
      data={albums}
      keyExtractor={(item,index)=>item+index}
      renderItem={({item})=>(
        <Album albumData={item} onPress={()=>onAlbumPress(item)}/>
      )}
      numColumns={2}
      contentContainerStyle={styles.albumListContent}
      />
    </View>
  )
}

const styles=StyleSheet.create({
  albumListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  albumListContent: {
    paddingBottom: 16,
  },
})

export default AlbumList