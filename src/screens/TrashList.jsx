import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rootStorage } from '../components/StorageConfig'
import { getDownloadURL, getMetadata, listAll,ref } from 'firebase/storage'
import AllList from '../components/AllList'

const TrashList = ({navigation}) => {
  const [storageList, setStorageList] = useState([])

  useEffect(()=>{
    refreshMediaList()
  },[])

  const refreshMediaList = async () => {
    try {
      const listRef = ref(rootStorage, '')
      const res = await listAll(listRef)
      const folderList = []
      for (const folderRef of res.prefixes) {
        const itemList = {
          title: folderRef.name,
          data: [],
        }
        const folderRes = await listAll(folderRef)

        for (const itemRef of folderRes.items) {
          const url = await getDownloadURL(itemRef)
          const metadata = await getMetadata(itemRef)
          if (metadata.customMetadata != undefined &&metadata.customMetadata.isDeleted) {

            console.log('url',url)
            itemList.data.push(url)
          }
        }
        folderList.push(itemList)
      }
      console.log(folderList)
      setStorageList(folderList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <AllList storageList={storageList} navigation={navigation} />
    </View>
  )
}

export default TrashList