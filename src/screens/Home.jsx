import { View, Text, SectionList, Image, ScrollView, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FloatingButton from '../components/FloatingButton'
import { launchImageLibrary } from 'react-native-image-picker'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { storage } from '../components/StorageConfig';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const Stack = createNativeStackNavigator()

// Data show at UI
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

// List of media need to send to Storage
const [media, setMedia] = useState([])
const [imageList, setImageList] = useState([]);

// -------------------------------------------------------------
// Firebase

// Send selected media to Storage
const upload = async () => {
  media.forEach(element => {
    uri = element.uri;
    submitData(uri);
  });

  setMedia([]);
}

// Send single media to Storage
const submitData = async (uri) => {
  console.log('Uploading');

  // Create blob file
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  // Create a reference to media
  const storageRef = ref(storage, uuid.v4());

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
    })
    .catch((error) => {
      console.log(error.message);
    });

  // We're done with the blob, close and release it
  blob.close();
}

// Receive all Media from Storage
const refreshImageList = () => {
  setImageList([]);

  // Create a reference under which you want to list
  const listRef = ref(storage, '');

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      // res.prefixes.forEach((folderRef) => {
      //   // All the prefixes under listRef.
      //   // You may call listAll() recursively on them.
      // });
      res.items.forEach((itemRef) => {
        // All the items under listRef, append it to imageList
        getDownloadURL(itemRef).then((url) => {
          setImageList((prev) => [...prev, url])
        });
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
}

// -------------------------------------------------------------

const Home = ({ navigation }) => {
  // Add media button
  const handlerPress = async () => {
        // Multi images picker
        const response = await MultipleImagePicker.openPicker(
          {
            mediaType: 'all',
            usedCameraButton: false,
          }
        );
        if (response) {
          setMedia(response.realpath)
          console.log(response.realpath)
          DATA[1].data[0].list.push(response.realpath)
          console.log(DATA[1].data)
          upload()
        }
      }

  const renderSectionHeader = ({ section }) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('ImageView', { item })}>
          <Image source={{ uri: item }} style={styles.itemImage} />
        </TouchableOpacity>
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
      <FloatingButton text='Refresh' onPress={refreshImageList}/>
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