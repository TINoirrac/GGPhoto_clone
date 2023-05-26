import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Album from '../components/Album'
import { auth, rtdb } from '../components/StorageConfig'
import { child, get, ref, set, push, query, orderByChild, equalTo, onValue } from 'firebase/database'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CreateAlbumModal from '../components/CreateAlbumModal'

const AlbumList = ({navigation}) => {
  const [refresh, setRefresh] = useState(null);
  const [refreshing, setResfreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [cachedAlbums, setCachedAlbums] = useState(null)

  useEffect(() => {
    setResfreshing(true)
    refreshAlbums()
  }, [refresh, navigation])

  const onRefresh = useCallback(() => {
    // setResfreshing(true)
    setRefresh(new Date().toTimeString())
    console.log('refreshing....')
    // setTimeout(() => {
    //   setResfreshing(false)
    // }, 2000)
  }, [])

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // Ref to user albums
  const userDB = ref(rtdb, auth.currentUser.uid);
  const userAlbums = child(userDB, "albums");
  console.log("user albums: " + userAlbums);


  // Create new empty album
  const createAlbum = (albumName) => {
    // to do: input album name
    const albumRef = child(userAlbums, albumName);
    set(albumRef, "");
    console.log(albumName + " created");
    setModalVisible(false)
    setRefresh(new Date().toTimeString())
  }

  // Read user album
  const refreshAlbums = () => {
    get(userAlbums).then((snapshot) => {
      console.log("refresh albums:");
      const albumList=[]
      snapshot.forEach(element => {
        const album={
          title: element.key,
        }
        albumList.push(album)
      });

      setCachedAlbums(albumList);
      setResfreshing(false)
    })
  }
  
  // const allData = [].concat(...cachedAlbums.map(item => item.data))
  
  // console.log('cachedAlbums',cachedAlbums)


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

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity style={{ paddingEnd: 15 }} onPress={handleOpenModal}>
            <Icon
              name='add'
              size={30}
              color='blue'
            />
          </TouchableOpacity>
        </View>
      )
    })
  })

  return (
    <View style={styles.albumListContainer}>
      <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={cachedAlbums}
      keyExtractor={(item,index)=>item+index}
      renderItem={({item})=>{
        return(
        <Album albumData={item} navigation={navigation}/>
      )}}
      numColumns={3}
      contentContainerStyle={styles.albumListContent}
      style={{height:'100%'}}
      />
      <CreateAlbumModal isVisible={modalVisible} onClose={handleCloseModal} onCreate={createAlbum} />
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