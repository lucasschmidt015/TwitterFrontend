import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Button, Icon } from '@rneui/themed';

export default function UpdateProfilePicture({ closeButton }) {

  const onPressSave = () => {

  }

  return (
    <View style={styles.updatePictureContainer}>
        <View style={styles.formPicture}>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#505050' }}>Update the profile picture</Text>
          </View>
          <View style={styles.imageConainer}>
            <Image style={styles.profilePicture} src='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg' />
          </View>
          <View style={styles.saveButtonContainer}>
            <Button radius={"sm"} type="solid" buttonStyle={{width: 95, backgroundColor: '#FF3A3A'} } onPress={closeButton}>
              Cancel
              <Icon name="close" color="white" iconStyle={{ paddingLeft: 5 }}/>
            </Button>
            <Button radius={"sm"} type="solid" buttonStyle={{width: 95, marginLeft: 5} } onPress={onPressSave}>
              Update
              <Icon name="save" color="white" iconStyle={{ paddingLeft: 5 }}/>
            </Button>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    updatePictureContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
    },
    formPicture: {
      width: '90%',
      height: '50%',
      borderWidth: 1,
      borderColor: '#DEDDDD',
      backgroundColor:'#fff',
      borderRadius: 7,
    },
    title: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageConainer: {
      width: '100%',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profilePicture: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 5,
      borderColor: '#000'
    },
    saveButtonContainer: {
      justifyContent: 'flex-end', 
      alignItems: 'flex-end', 
      paddingHorizontal: 10, 
      height: 90,
      flexDirection: 'row'
    }
})