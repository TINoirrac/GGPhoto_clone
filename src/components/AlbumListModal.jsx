import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const AlbumListModal = ({ onClose, onCreate,albums,addToAlbum, ...props }) => {

    const renderAlbumItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => addToAlbum(item.title)} style={styles.albumItemContainer}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            {...props}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onClose} style={styles.container} >
                        <Icon style={styles.icon}
                            name='close'
                            size={20} />
                    </TouchableOpacity>
                    <FlatList
                        data={albums}
                        renderItem={renderAlbumItem}
                        keyExtractor={(item,index) => item+index}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row'
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    icon: {
        margin: 10
    },
    albumItemContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
})

export default AlbumListModal