import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const FooterBar = ({ onPressSlide,onPressDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Icon name='share' size={20} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name='tune' size={20} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={onPressSlide}>
        <Icon name='slideshow' size={20} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={onPressDelete} >
        <Icon name='delete' size={20} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 16,
  },
  icon: {
    alignItems: 'center',
    flex: 1,
  }
})

export default FooterBar