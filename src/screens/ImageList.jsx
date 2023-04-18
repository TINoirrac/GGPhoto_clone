import { View, Text, SectionList, Image, ScrollView, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FloatingButton from '../components/FloatingButton'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { rootStorage } from '../components/StorageConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import uuid from 'react-native-uuid';
import ImageView from './ImageView';
import ImageDetail from './ImageDetail';
import AllList from '../components/AllList';
import { user } from '../components/StorageConfig';

const Stack = createNativeStackNavigator()

// Data show at UI
const DATA = [
  {
    title: 'Movies',
    data: []
  },
  {
    title: 'Pictures',
    data: [['https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png']]
  }
]

const ImageList = ({ navigation }) => {
  // Firebase-------------------------------------------------------------
  // List of media retrieve from Storage
  const [refresh, setRefresh] = useState(null);
  const [storageList, setStorageList] = useState([])

  useEffect(() => {
    refreshMediaList()
  }, [refresh])

  // Send selected media to Storage
  const upload = async (media) => {
    console.log("upload:")
    console.log(media)
    await media.forEach(uri => {
      if (uri != null)
        submitData(uri)
    });
    setRefresh(new Date().toTimeString())
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
    const userRef = ref(rootStorage, user.currentUser.uid);
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
    try {
      const listRef = ref(rootStorage, '');
      const res = await listAll(listRef);
      const folderList = []
      for (const folderRef of res.prefixes) {
        // console.log(folderRef.name);
        const itemList = {
          title: folderRef.name,
          data: []
        };
        const folderRes = await listAll(folderRef);

        for (const itemRef of folderRes.items) {
          const url = await getDownloadURL(itemRef);
          // console.log(url);
          itemList.data.push(url);
        }

        // console.log('itemList',itemList);
        folderList.push(itemList);
        // console.log('folderList',folderList)
      }
      setStorageList(folderList)
      // console.log('storageList',storageList);

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

  const renderSectionHeader = ({ section }) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
  };

  return (
    <View>
      <View style={{ width: '100%', height: '100%' }}>
        <AllList storageList={storageList} navigation={navigation}/>
        
        <FloatingButton onPress={handlerPress} text='+' />
        {/* <Button onPress={Refresh} title='refresh'/> */}
      </View>
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
    flex:1
  },
  item: {
    flex:1/4,
    margin:1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100
  },
});

export default ImageList