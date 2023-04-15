import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import FooterBar from '../components/FooterBar';
import FastImage from 'react-native-fast-image';

const ImageDetail = ({ route }) => {
  const { images, initialIndex } = route.params;
  const [autoplay, setAutoplay] = useState(false)
  console.log('autoplay', autoplay)
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} index={initialIndex} loop={false} autoplay={autoplay}>
        {images.map((imageUri, index) => (
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
        ))}
      </Swiper>
      <FooterBar onPressSlide={() => setAutoplay(!autoplay)} />
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
