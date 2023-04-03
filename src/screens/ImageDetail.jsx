import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import FooterBar from '../components/FooterBar';

const ImageDetail = ({ route }) => {
  const { images, initialIndex } = route.params;

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} index={initialIndex} loop={false} autoplay={false}>
        {images.map((imageUri, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: imageUri }} resizeMode="contain" style={styles.image} />
          </View>
        ))}
      </Swiper>
      <FooterBar/>
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
    width:'100%',
    height:'100%',
    flex: 1,
  },
});

export default ImageDetail
