import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import FooterBar from '../components/FooterBar';
import FastImage from 'react-native-fast-image';
import { getMetadata, ref, updateMetadata } from 'firebase/storage'
import { rootStorage } from '../components/StorageConfig';

const ImageDetail = ({ route }) => {
  const { images, initialItem } = route.params;
  const [autoplay, setAutoplay] = useState(false)
  const [itemCurrent, setItemCurrent] = useState(initialItem)
  const initialIndex = images.indexOf(initialItem)
  console.log('autoplay', autoplay)

  const forestRef = ref(rootStorage, itemCurrent)

  const deleteHandle = () => {
    const newMetadata = {
      customMetadata: {
        isDeleted: true,
        deletedAt: new Date().toTimeString(),
      }
    }
    updateMetadata(forestRef, newMetadata).then((metadata) => {
      console.log(metadata.customMetadata.isDeleted)
    }).catch((error) => {
      console.log(error)
    })

  }

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
        {images.map((imageUri, index) => {
          return (
            <View style={styles.slide} key={index}>
              <FastImage
                source={{
                  uri: imageUri,
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
      <FooterBar onPressSlide={() => setAutoplay(!autoplay)} onPressDelete={deleteHandle} />
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
