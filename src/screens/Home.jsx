import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ImageList from './ImageList'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Drawer = createDrawerNavigator()

const Home = () => {
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
          <TouchableOpacity style={{paddingEnd:15}}>
            <Icon
              name='account-circle'
              size={30}
              color='blue'
            />
          </TouchableOpacity>
        )
      }} />
    </Drawer.Navigator>
  )
}

export default Home