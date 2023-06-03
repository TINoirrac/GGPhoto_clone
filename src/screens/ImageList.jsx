import { View, Text, SectionList, Image, ScrollView, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import FloatingButton from '../components/FloatingButton'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { rootStorage, auth, rtdb } from '../components/StorageConfig';
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata } from "firebase/storage";
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import uuid from 'react-native-uuid';
import DateList from '../components/DateList';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AccountModal from '../components/AccountModal';
import AlbumListModal from '../components/AlbumListModal';
import { ref as refdb, child, onValue, push, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const ImageList = ({ navigation, route }) => {
  // Firebase-------------------------------------------------------------
  // List of media retrieve from Storage
  // const {updatedImages}=route.params
  const [refresh, setRefresh] = useState(null);
  const [refreshing, setResfreshing] = useState(false)
  const [storageList, setStorageList] = useState([])
  const [pressSelect, setPressSelect] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [albumListModal, setAlbumListModal] = useState(false)

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  // console.log('isUpdatedImages', navigation)

  useEffect(() => {
    setResfreshing(true)
    refreshMediaList()
  }, [refresh, navigation])

  useEffect(() => {
    if (route.params?.isUpdatedImages) {
      // setResfreshing(true)
      setRefresh(new Date().toTimeString())
      console.log('refreshing....')
      // setTimeout(() => {
      //   setRefresh(new Date().toTimeString())
      //   setResfreshing(false)
      // }, 2000)
    }
  }, [route.params])

  const onRefresh = useCallback(() => {
    // setResfreshing(true)
    setRefresh(new Date().toTimeString())
    console.log('refreshing....')
    // setTimeout(() => {
    //   setResfreshing(false)
    // }, 2000)
  }, [])

  // Send selected media to Storage
  const upload = async (media) => {
    console.log("upload:")
    console.log(media)
    await media.forEach(uri => {
      if (uri != null)
        submitData(uri).then(() => {
        })
    })
    setTimeout(() => {
      // setResfreshing(true)
      setRefresh(new Date().toTimeString())
    }, 1000);
  }

  // Send single media to Storage
  const submitData = async (uri) => {
    console.log('Submitting data');

    // Create blob file
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log("Submit error:", e);
        reject(new TypeError("Blob throw: Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // Create reference to user storage
    const userRef = ref(rootStorage, auth.currentUser.uid);
    // Create reference to child storage
    const childRef = ref(userRef, new Date().toDateString());
    // Create reference to media
    const mediaRef = ref(childRef, uuid.v4());

    // 'file' comes from the Blob or File API
    uploadBytes(mediaRef, blob)
      .then((snapshot) => {
        console.log('Submitted a blob or file!');
      })
      .catch((error) => {
        console.log(error.message);
      });

    // We're done with the blob, close and release it
    blob.close();
  }

  // Receive all Media from Storage
  const refreshMediaList = async () => {
    // console.log('crawling..')
    try {
      // Check if login, ref to user folder
      if (auth.currentUser != null) {
        const listRef = ref(rootStorage, auth.currentUser.uid);

        const res = await listAll(listRef);
        const folderList = []
        for (const folderRef of res.prefixes) {
          // console.log(folderRef.name);
          const itemList = {
            title: folderRef.name,
            data: []
          }

          const folderRes = await listAll(folderRef);

          for (const itemRef of folderRes.items) {
            const item = {}
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef)
            // console.log(url);
            if (metadata.customMetadata == undefined) {
              item.uri = url
              item.isChecked = false
              itemList.data.push(item)
            }
          }

          // console.log('itemList',itemList);
          if (itemList.data.length != 0)
            folderList.push(itemList);
          // console.log('folderList',folderList)
        }
        setStorageList(folderList)
        setResfreshing(false)
        // console.log('storageList',storageList);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  //-------------------------------------------------------------
  // const Refresh=()=>{
  //   setRefresh(new Date().toTimeString())
  // }

  // Add media button
  const handlerPress = async () => {
    // Multi images picker
    await MultipleImagePicker.openPicker(
      {
        mediaType: 'all',
        usedCameraButton: false,
      }
    ).then((responses) => {
      console.log("Image picker:")
      let media = []
      responses.forEach(response => {
        console.log(response.realPath)
        media.push('file://' + response.realPath)
      })
      upload(media)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const handleSelectButton = () => {

    setPressSelect((prevPressSelect) => {
      return !prevPressSelect
    })

    setSelectedImages((prevSelectedImages) => {
      prevSelectedImages.map((item, index) => {
        item.isChecked = false
      })
      return []
    })

  }

  // console.log('selectedImages',selectedImages)
  const deleteHandle = (data) => {
    console.log('delete', data)
    data.forEach(item => {
      console.log('item', item)
      const forestRef = ref(rootStorage, item.uri)
      const newMetadata = {
        customMetadata: {
          isDeleted: true,
          deletedAt: new Date().toTimeString(),
        }
      }
      updateMetadata(forestRef, newMetadata).then((metadata) => {
        console.log(metadata.customMetadata.isDeleted)
        // Xóa phần tử khỏi danh sách images
        // const newImages = updatedImages.filter(image => image !== itemCurrent);
        // Cập nhật state mới
        setRefresh(new Date().toTimeString())
      }).catch((error) => {
        console.log(error)
      })
    });
  }
  // const renderSectionHeader = ({ section }) => {
  //   return <Text style={styles.sectionHeader}>{section.title}</Text>;
  // };

  useLayoutEffect(() => {
    if (pressSelect) {
      navigation.setOptions({
        headerLeft: () => (
          <View>
            <TouchableOpacity style={{ marginStart: 15 }} onPress={handleSelectButton}>
              <Icon
                name='close'
                size={30}
                color='blue'
              />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginEnd: 15 }} onPress={() => { setAlbumListModal(true) }}>
              <Icon
                name='playlist-add'
                size={30}
                color='blue'
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginEnd: 15 }} onPress={() => deleteHandle(selectedImages)}>
              <Icon
                name='delete'
                size={30}
                color='blue'
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
    else {
      navigation.setOptions({
        headerLeft: null,
        headerRight: () => (
          <View>
            <TouchableOpacity style={{ paddingEnd: 15 }} onPress={handleOpenModal}>
              {
                (auth.currentUser.photoURL) ? (
                  <Image style={styles.accountAvatar} source={{ uri: auth.currentUser.photoURL }} />

                ) : (

                  <Icon
                    name='account-circle'
                    size={30}
                    color='blue'
                  />
                )
              }
            </TouchableOpacity>
            <AccountModal isVisible={modalVisible} navigation={navigation} onClose={handleCloseModal} />
          </View>
        )
      })
    }
  }, [modalVisible, pressSelect, selectedImages])

  const userDB = refdb(rtdb, auth.currentUser.uid);
  const userAlbums = child(userDB, "albums");
  const albumList = []
  onValue(userAlbums, (snapshot) => {
    // console.log('snapshot',snapshot)
    snapshot.forEach(element => {
      const album = {
        title: element.key,
      }
      albumList.push(album)
    });

  })
  // console.log(albumList)

  const addToAlbum = (albumName) => {
    selectedImages.forEach(item => {
      const albumRef = child(userAlbums, albumName);

      // check if image already in album (not complete)
      // const result = query(albumRef, orderByChild(''), equalTo('imageURL123'));
      // console.log(result);

      // add image's downloadable url to album
      const image = push(albumRef);
      set(image, { url: item.uri });
    })
    setAlbumListModal(false)

  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <DateList storageList={storageList} navigation={navigation} setRefresh={setRefresh} navFrom={'ImageList'} refreshing={refreshing} onRefresh={onRefresh} pressSelect={pressSelect} selectedImages={selectedImages} setSelectedImages={setSelectedImages} onLongPress={handleSelectButton} />

      <FloatingButton onPress={handlerPress} text='+' />
      {/* <Button onPress={Refresh} title='refresh'/> */}
      <AlbumListModal addToAlbum={addToAlbum} albums={albumList} visible={albumListModal} onClose={() => setAlbumListModal(false)} />
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
  accountAvatar: {
    width: 30,
    height: 30,
    borderRadius: 24,
  },
});

export default ImageList