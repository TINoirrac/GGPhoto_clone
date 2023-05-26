import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'


const CreateAlbumModal = ({onClose,onCreate,isVisible}) => {
    const [title,setTitle]=useState(null)

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onClose} style={styles.container} >
                        <Icon style={styles.icon}
                            name='close'
                            size={20} />
                    </TouchableOpacity>

                        <View style={styles.container}>
                            <View style={styles.accountItemContainer}>
                                <TextInput value={title} placeholder='Add a title' onChangeText={setTitle}/>
                            </View>
                            <TouchableOpacity onPress={()=>{onCreate(title)}}>
                                <Text>Create</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        flex: 1,
        flexDirection: 'row'
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
    accountItemContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    accountInfo: {
        flexDirection: 'column'
    },
    accountAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    accountName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    accountEmail: {
        fontSize: 14,
        color: '#888888',
    },

})

export default CreateAlbumModal