import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const FooterBar = ({ onPressSlide, onPressDelete, navFrom, onPressDeleteForever,onPressDeleteFromAlbum, onPressRestore,onPressAddToAlbum }) => {
  return (
    <View>
      {
        (navFrom == 'ImageList') ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={onPressAddToAlbum}>
              <Icon name='playlist-add' size={20} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPressSlide}>
              <Icon name='slideshow' size={20} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPressDelete} >
              <Icon name='delete' size={20} color='white' />
            </TouchableOpacity>
          </View>
        ) : (navFrom == 'TrashList') ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={onPressRestore}>
              <Icon name='restore-from-trash' size={20} color='white' />
              <Text style={{ color: 'white', marginStart: 5 }}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPressDeleteForever}>
              <Icon name='delete-forever' size={20} color='white' />
              <Text style={{ color: 'white', marginStart: 5 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : (navFrom == 'AlbumDetail') ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={onPressSlide}>
              <Icon name='slideshow' size={20} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPressDeleteFromAlbum} >
              <Icon name='delete' size={20} color='white' />
              <Text style={{ color: 'white', marginStart: 5 }}>Delete from album</Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
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
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export default FooterBar