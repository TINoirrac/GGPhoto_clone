import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ImageList from './ImageList'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AccountModal from '../components/AccountModal'
import TrashList from './TrashList'
import AlbumList from './AlbumList'

const Drawer = createDrawerNavigator()

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <Drawer.Navigator >
      <Drawer.Screen name='ImageList' component={ImageList} options={{
        title: 'Photos',
        drawerIcon: ({ focused, size }) => (
          <Icon
            name='image'
            size={size}
          />
        ),
        headerRight: () => (
          <View>
            <TouchableOpacity style={{ paddingEnd: 15 }} onPress={handleOpenModal}>
              <Icon
                name='account-circle'
                size={30}
                color='blue'
              />
            </TouchableOpacity>
            <AccountModal isVisible={modalVisible} onClose={handleCloseModal} />
          </View>
        )
      }} />
      <Drawer.Screen name='TrashList' component={TrashList} options={{
        title: 'Trash',
        drawerIcon: ({ focused, size }) => (
          <Icon
            name='delete'
            size={size}
          />
        )
      }} />
      <Drawer.Screen name='Album' component={AlbumList} options={{
        title: 'Album',
        drawerIcon: ({ focused, size }) => (
          <Icon
            name='photo-album'
            size={size}
          />
        ),
        headerRight: () => (
          <View>
            <TouchableOpacity style={{ paddingEnd: 15 }}>
              <Icon
                name='add'
                size={30}
                color='blue'
              />
            </TouchableOpacity>
          </View>
        )
      }}
      />
    </Drawer.Navigator>
  )
}

export default Home