import { View, Text, SectionList, Image, ScrollView, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import FloatingButton from '../components/FloatingButton'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { rootStorage } from '../components/StorageConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import uuid from 'react-native-uuid';
import ImageView from './ImageView';
import ImageDetail from './ImageDetail';

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
        console.log(e);
        reject(new TypeError("Blob throw: Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // Create reference to child storage
    const childRef = ref(rootStorage, new Date().toDateString());
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
      const storageList = [];
  
      for (const folderRef of res.prefixes) {
        console.log(folderRef.name);
        const itemList = [];
        const folderRes = await listAll(folderRef);
        
        for (const itemRef of folderRes.items) {
          const url = await getDownloadURL(itemRef);
          console.log(url);
          itemList.push(url);
        }
  
        console.log(itemList);
        storageList.push(itemList);
      }
  
      console.log(storageList);
      DATA.push({
        title: 'Storage',
        data: storageList
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  //-------------------------------------------------------------
  const Refresh=()=>{
    setRefresh(new Date().toTimeString())
  }

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

  displayList = []

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('ImageDetail', { images: displayList, initialIndex: index })}>
          <Image source={{ uri: item }} style={styles.itemImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={{ width: '100%', height: '100%' }}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={({ item }) => {
            displayList = item
            console.log("UI:")
            console.log(item)
            return (
              <View style={styles.row}>
                <FlatList
                  data={item}
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
        <Button onPress={Refresh} title='refresh'/>
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

export default ImageList