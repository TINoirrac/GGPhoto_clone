import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ImageDetail from './src/screens/ImageDetail'
import Home from './src/screens/Home'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LogIn from './src/screens/LogIn'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LogIn} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='ImageDetail' component={ImageDetail} options={{
          title:'',
          headerRight:()=>(
            <TouchableOpacity>
              <Icon
              name='more-vert'
              size={25}
              />
            </TouchableOpacity>
          )
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App