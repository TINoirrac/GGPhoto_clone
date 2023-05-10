import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import Album from '../components/Album'
import { auth, rtdb } from '../components/StorageConfig'
import { child, get, ref, set } from 'firebase/database'

const AlbumList = ({albums,onAlbumPress}) => {
  const [cachedAlbums, setCachedAlbums] = useState(null);

  // Ref to user albums
  const userDB = ref(rtdb, auth.currentUser.uid);
  const userAlbums = child(userDB, "albums");
  console.log("user albums: " + userAlbums);

  // Create new empty album
  const createAlbum = () => {
    let albumName = "album1";

    let albumRef = child(userAlbums, albumName);
    set(albumRef, "");
    console.log(albumName + " created");
  }

  // Read user album
  const refreshAlbums = () => {
    get(userAlbums).then((snapshot) => {
      console.log("refresh albums:");
      console.log(snapshot);

      setCachedAlbums(snapshot);
    })
  }

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
      <Button title='create album' onPress={createAlbum}/>
      <Button title='refresh' onPress={refreshAlbums}/>
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