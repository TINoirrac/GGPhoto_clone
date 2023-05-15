import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import Album from '../components/Album'
import { auth, rtdb } from '../components/StorageConfig'
import { child, get, ref, set, push, query, orderByChild, equalTo } from 'firebase/database'

const AlbumList = ({albums,onAlbumPress}) => {
  const [cachedAlbums, setCachedAlbums] = useState(null);

  // Ref to user albums
  const userDB = ref(rtdb, auth.currentUser.uid);
  const userAlbums = child(userDB, "albums");
  console.log("user albums: " + userAlbums);

  // Create new empty album
  const createAlbum = () => {
    // to do: input album name
    let albumName = "album1";

    const albumRef = child(userAlbums, albumName);
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

  // Add a image to album
  const addToAlbum = () => {
    // to do: get imageURL & album name
    let albumName = "album2";
    let imageURL = "imageURL123";

    const albumRef = child(userAlbums, albumName);

    // check if image already in album (not complete)
    // const result = query(albumRef, orderByChild(''), equalTo('imageURL123'));
    // console.log(result);

    // add image's downloadable url to album
    const image = push(albumRef);
    set(image, {url: imageURL});
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
      <Button title='add to album' onPress={addToAlbum}/>
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