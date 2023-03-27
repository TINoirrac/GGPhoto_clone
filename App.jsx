import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ImageView from './src/screens/ImageView'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Drawer=createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home} options={{
          title:'Photos',
          drawerIcon:({focused,size})=>(
            <Icon
              name='image'
              size={size}
              
            />
          )
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App