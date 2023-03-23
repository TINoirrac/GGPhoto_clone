import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
        <DrawerItemList/>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent