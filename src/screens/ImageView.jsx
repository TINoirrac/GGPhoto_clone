import { View, Text, StyleSheet, Image, Dimensions, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const IMAGE_WIDTH = windowWidth * 0.8
const SNAP_THRESHOLD = IMAGE_WIDTH * 0.3

const ImageView = ({ visible, selectedImageIndex, onClose, data }) => {
    const [selectedIndex, setSeclectedIndex] = useState(selectedImageIndex)
    const translateX = useSharedValue(0)
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX
        },
        onEnd: (event) => {
            if (Math.abs(event.velocityX) < 500 && Math.abs(translateX.value) < SNAP_THRESHOLD) {
                translateX.value = withSpring(0)
                return
            }
            const newIndex = event.velocityX > 0 ? selectedIndex - 1 : selectedIndex + 1
            if (newIndex >= 0 && newIndex < data.length) {
                setSeclectedIndex(newIndex)
            }
            translateX.value = withSpring(-IMAGE_WIDTH * (newIndex - selectedImageIndex)),
            {
                overshootClamping: true
            }
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image style={styles.image} source={{ uri: item }} />
        </View>
    )

    return (
        
        <Modal visible={visible} transparent={true} onRequestClose={onClose}>
            <View >
                <View >
                    <TouchableOpacity onPress={onClose}>
                        <Text >Close</Text>
                    </TouchableOpacity>
                </View>
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View>
                        <FlatList
                            data={data}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item,index)=>item+index }
                            renderItem={renderItem}
                            initialScrollIndex={selectedIndex}
                            getItemLayout={(data, index) => ({
                                length: IMAGE_WIDTH,
                                offset: IMAGE_WIDTH * index,
                                index
                            })}
                        />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    closeText: {
        color: 'white',
        fontSize: 16,
    },
    content: {
        height: windowHeight * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    item: {
        width: IMAGE_WIDTH,
        height: windowHeight * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})

export default ImageView