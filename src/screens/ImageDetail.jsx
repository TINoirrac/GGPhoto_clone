import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import FooterBar from '../components/FooterBar';
import FastImage from 'react-native-fast-image';
import { deleteObject, ref, updateMetadata } from 'firebase/storage'
import { auth, rootStorage, rtdb } from '../components/StorageConfig';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { child,ref as refdb, remove } from 'firebase/database';

const ImageDetail = ({ route, navigation }) => {
  const { images, initialItem, navFrom ,albumTitle} = route.params;
  const [autoplay, setAutoplay] = useState(false)
  const [itemCurrent, setItemCurrent] = useState(initialItem)
  const [updatedImages, setUpdatedImages] = useState(images)
  const [isUpdatedImages, setIsUpdatedImages] = useState(false)
  const initialIndex = images.indexOf(initialItem)
  console.log('images', initialItem)


  const deleteHandle = () => {
    const forestRef = ref(rootStorage, itemCurrent.uri)
    const newMetadata = {
      customMetadata: {
        isDeleted: true,
        deletedAt: new Date().toTimeString(),
      }
    }
    updateMetadata(forestRef, newMetadata).then((metadata) => {
      console.log(metadata.customMetadata.isDeleted)
      // Xóa phần tử khỏi danh sách images
      const newImages = updatedImages.filter(image => image !== itemCurrent);
      // Cập nhật state mới
      setIsUpdatedImages(true)
      setUpdatedImages(newImages);
    }).catch((error) => {
      console.log(error)
    })
  }

  const deleteForeverHandle = () => {
    const desertRef = ref(rootStorage, itemCurrent.uri)

    deleteObject(desertRef).then(() => {
      const newImages = updatedImages.filter(image => image != itemCurrent)

      setIsUpdatedImages(true)
      setUpdatedImages(newImages)
    }).catch((error) => {
      console.log(error)
    })
  }

  const restoreHandle = () => {
    const forestRef = ref(rootStorage, itemCurrent.uri)
    const newMetadata = {
      customMetadata: null
    }
    updateMetadata(forestRef, newMetadata).then((metadata) => {
      // console.log(metadata.customMetadata)
      // Xóa phần tử khỏi danh sách images
      const newImages = updatedImages.filter(image => image !== itemCurrent);
      // Cập nhật state mới
      setIsUpdatedImages(true)
      setUpdatedImages(newImages);
    }).catch((error) => {
      console.log(error)
    })
  }

  const deleteFromAlbum = () => {
    const userDB = refdb(rtdb, auth.currentUser.uid);
    const itemRef = child(userDB, 'albums/' + albumTitle + '/' + itemCurrent.parentUrl)
    remove(itemRef)
      .then(() => {
        const newImages = updatedImages.filter(image => image !== itemCurrent);
        setIsUpdatedImages(true)
        setUpdatedImages(newImages);
      }).catch((error => {
        console.log(error)
      }))
  }

  useEffect(() => {
    if (updatedImages.length == 0) {
      navigation.navigate({
        name: navFrom,
        params: { isUpdatedImages: isUpdatedImages },
        merge: true
      })
    }
  }, [updatedImages])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate({
            name: navFrom,
            params: { isUpdatedImages: isUpdatedImages },
            merge: true
          })
        }}>
          <Icon
            name='arrow-back'
            size={25}
          />
        </TouchableOpacity>
      )
    })
  }, [navigation, isUpdatedImages])

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        index={initialIndex}
        loop={false}
        autoplay={autoplay}
        onIndexChanged={(index) => {
          setItemCurrent(images.at(index))
        }}>
        {updatedImages.map((image, index) => {
          return (
            <View style={styles.slide} key={index}>
              <FastImage
                source={{
                  uri: image.uri,
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.high,
                }}
                resizeMode='contain'
                style={styles.image}
              />
            </View>
          )
        }
        )}
      </Swiper>
      <FooterBar onPressSlide={() => setAutoplay(!autoplay)} onPressDeleteFromAlbum={deleteFromAlbum} onPressDelete={deleteHandle} onPressDeleteForever={deleteForeverHandle} onPressRestore={restoreHandle} navFrom={navFrom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export default ImageDetail
