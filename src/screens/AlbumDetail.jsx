import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import AllList from '../components/AllList'
import { child, get, onValue, ref, remove } from 'firebase/database'
import { auth, rtdb } from '../components/StorageConfig'

const AlbumDetail = ({ navigation, route }) => {
    const { title } = route.params
    const [pressSelect, setPressSelect] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const [refresh, setRefresh] = useState(null);
    const [refreshing, setResfreshing] = useState(false)
    const [cachedAlbum, setCachedAlbum] = useState([])

    const userDB = ref(rtdb, auth.currentUser.uid);
    const mediaList = child(userDB, 'albums/' + title)

    useEffect(() => {
        setResfreshing(true)
        refreshAlbum()
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

        setRefresh(new Date().toTimeString())
        console.log('refreshing....')

    }, [])

    const refreshAlbum = () => {
        get(mediaList).then(snapshot => {
            const data = []
            snapshot.forEach(element => {
                const item = {
                    uri: element.val().url,
                    isChecked: false,
                    parentUrl: element.key
                }
                data.push(item)
            })
            setCachedAlbum(data)
            setResfreshing(false)
        })
    }

    const handleSelectButton = () => {

        setPressSelect((prevPressSelect) => {

            return !prevPressSelect
        })
        setSelectedImages((prevSelectedImages) => {
            prevSelectedImages.map((item, index) => {
                item.isChecked = false
            })
            return []
        })
    }

    const handleDelete = (data) => {
        data.forEach(item => {
            const itemRef = child(userDB, 'albums/' + title + '/' + item.parentUrl)
            remove(itemRef)
                .then(() => {
                    setRefresh(new Date().toTimeString())
                }).catch((error => {
                    console.log(error)
                }))
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
            <AllList allData={cachedAlbum} navigation={navigation} onRefresh={onRefresh} refreshing={refreshing} navFrom={'AlbumDetail'} albumTitle={title} selectedImages={selectedImages} setSelectedImages={setSelectedImages} pressSelect={pressSelect} />
            {pressSelect && (
                <View>
                    {selectedImages.length != 0 ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => handleDelete(selectedImages)}>
                                <Text style={{ fontSize: 17, color: 'red' }}>Delete from album</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => handleDelete(cachedAlbum)}>
                                <Text style={{ fontSize: 17, color: 'red' }}>Delete album</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )
            }
        </View>
    )
}

export default AlbumDetail