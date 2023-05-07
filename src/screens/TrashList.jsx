import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { auth, rootStorage } from '../components/StorageConfig'
import { deleteObject, getDownloadURL, getMetadata, listAll, ref, updateMetadata } from 'firebase/storage'
import AllList from '../components/AllList'
import { TouchableOpacity } from 'react-native'

const TrashList = ({ navigation, route }) => {

  const [refresh, setRefresh] = useState(null);
  const [refreshing, setResfreshing] = useState(false)
  const [storageList, setStorageList] = useState([])
  const [pressSelect, setPressSelect] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])

  useEffect(() => {
    setResfreshing(true)
    refreshMediaList()
  }, [refresh, navigation])

  useEffect(() => {
    if (route.params?.isUpdatedImages) {
      // setResfreshing(true)
      setRefresh(new Date().toTimeString())
      console.log('refreshing....')
      // setTimeout(() => {
      //   setResfreshing(false)
      // }, 2000)
    }
  }, [route.params])

  const onRefresh = useCallback(() => {
    // setResfreshing(true)
    setRefresh(new Date().toTimeString())
    console.log('refreshing....')
    // setTimeout(() => {
    //   setResfreshing(false)
    // }, 2000)
  }, [])

  const refreshMediaList = async () => {
    console.log('crawling..')
    try {
      if (auth.currentUser != null) {
        const listRef = ref(rootStorage, auth.currentUser.uid)
        const res = await listAll(listRef)
        const folderList = []
        for (const folderRef of res.prefixes) {
          const itemList = {
            title: folderRef.name,
            data: [],
          }

          const folderRes = await listAll(folderRef)

          for (const itemRef of folderRes.items) {
            const item = {}
            const url = await getDownloadURL(itemRef)
            const metadata = await getMetadata(itemRef)
            if (metadata.customMetadata != undefined && metadata.customMetadata.isDeleted) {
              item.uri = url
              item.isChecked = false
              itemList.data.push(item)
            }
          }
          folderList.push(itemList)
        }
        console.log(folderList)
        setStorageList(folderList)
        setResfreshing(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const allData = [].concat(...storageList.map(item => item.data))

  const handleSelectButton = () => {
    setPressSelect(!pressSelect)
    setSelectedImages([])
  }

  navigation.setOptions({
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

  const handleDelete = (data) => {
    data.forEach(item => {
      const desertRef = ref(rootStorage, item.uri)

      deleteObject(desertRef).then(() => {
        setRefresh(new Date().toTimeString())
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  const handleRestore = (data) => {
    data.forEach(item => {
      const forestRef = ref(rootStorage, item.uri)
      const newMetadata = {
        customMetadata: null
      }
      updateMetadata(forestRef, newMetadata).then((metadata) => {
        setRefresh(new Date().toTimeString())
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <AllList allData={allData} navigation={navigation} refreshing={refreshing} onRefresh={onRefresh} navFrom='TrashList' pressSelect={pressSelect} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      {pressSelect && (
        <View>
          {selectedImages.length != 0 ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
              <TouchableOpacity onPress={()=>handleDelete(selectedImages)}>
                <Text style={{ fontSize: 17, color: 'red' }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleRestore(selectedImages)}>
                <Text style={{ fontSize: 17, color: 'blue' }}>Restore</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
              <TouchableOpacity onPress={()=>handleDelete(allData)}>
                <Text style={{ fontSize: 17, color: 'red' }}>Delete all</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleRestore(allData)}>
                <Text style={{ fontSize: 17, color: 'blue' }}>Restore all</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )
      }
    </View >
  )
}

export default TrashList