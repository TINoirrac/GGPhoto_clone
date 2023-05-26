import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AllList from '../components/AllList'
import { child, onValue, ref } from 'firebase/database'
import { auth, rtdb } from '../components/StorageConfig'

const AlbumDetail = ({ navigation, route }) => {
    const { title } = route.params
    const [pressSelect, setPressSelect] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])

    const userDB = ref(rtdb, auth.currentUser.uid);
    const mediaList = child(userDB,'albums/'+ title)

    const data=[]
    console.log('mediaList',mediaList)
    onValue(mediaList,(snapshot)=>{
        snapshot.forEach(element=>{
            const item={
                uri:element.val().url,
                isChecked:false
            }
            data.push(item)
        })
        console.log('snapshot',data)
    })

    const handleSelectButton = () => {

        setPressSelect((prevPressSelect) => {
    
          return !prevPressSelect
        })
        setSelectedImages((prevSelectedImages)=>{
          prevSelectedImages.map((item,index)=>{
            item.isChecked=false
          })
          return []
        })
      }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
            headerRight: () => (
                <View>
                    <TouchableOpacity style={{ marginEnd: 15 }} onPress={handleSelectButton}>
                        <Text style={{ fontSize: 17, color: 'blue' }}>
                            Select
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <AllList allData={data} navigation={navigation} navFrom={'AlbumDetail'} selectedImages={selectedImages} setSelectedImages={setSelectedImages} pressSelect={pressSelect} />
        </View>
    )
}

export default AlbumDetail