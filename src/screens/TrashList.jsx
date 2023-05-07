import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { auth, rootStorage } from '../components/StorageConfig'
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage'
import AllList from '../components/AllList'

const TrashList = ({ navigation,route }) => {

  const [refresh, setRefresh] = useState(null);
  const [refreshing, setResfreshing] = useState(false)
  const [storageList, setStorageList] = useState([])

  useEffect(() => {
    refreshMediaList()
  }, [refresh])

  useEffect(() => {
    if (route.params?.isUpdatedImages){
      setRefresh(new Date().toTimeString())
      setResfreshing(true)
      console.log('refreshing....')
      setTimeout(() => {
        setResfreshing(false)
      }, 2000)
    }
  }, [route.params])

  const onRefresh = useCallback(() => {
    setResfreshing(true)
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
            const url = await getDownloadURL(itemRef)
            const metadata = await getMetadata(itemRef)
            if (metadata.customMetadata != undefined && metadata.customMetadata.isDeleted) {
              itemList.data.push(url)
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

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <AllList storageList={storageList} navigation={navigation} refreshing={refreshing} onRefresh={onRefresh} navFrom='TrashList' />
    </View>
  )
}

export default TrashList