import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePicture } from '@/lib/api/user';
import { useAuth } from '@/context/AuthContext';

export default function UpdateProfilePicture({ closeButton }) {

  const [image, setImage] = useState<{ uri: string, name: string, type: string } | null>(null);

  const { accessToken } = useAuth();

  const onPressLoadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];

      setImage({
        uri: selectedImage.uri,
        name: selectedImage.fileName || `photo_${new Date().toISOString().replace(/[:.]/g, '-')}.${selectedImage.mimeType.split('/')[1]}`,
        type: selectedImage.mimeType as string,
      });
    }

  }

  const onPressSave = async () => { // I haven't tested it yet, we need to continue here later <------------------
    
    if (!image) {
      return;
    }

    try {
      await updateProfilePicture(image, accessToken);

      setImage(null);

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.updatePictureContainer}>
        <View style={styles.formPicture}>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#505050' }}>Update the profile picture</Text>
          </View>
          <View style={styles.imageConainer}>
            <TouchableWithoutFeedback onPress={onPressLoadImage}>
              <Image style={styles.profilePicture} source={ image ? { uri: image.uri } : { uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg' } } />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressLoadImage}>
              <Image style={styles.blankPicture} source={require('../assets/images/blankProfile.png')} />
            </TouchableWithoutFeedback>
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
      alignItems: 'center',
    },
    profilePicture: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 5,
      borderColor: '#000'
    },
    blankPicture: {
      position: 'absolute', 
      width: 300, 
      height: 300,
      opacity: 0.8
    },
    saveButtonContainer: {
      justifyContent: 'flex-end', 
      alignItems: 'flex-end', 
      paddingHorizontal: 10, 
      height: 90,
      flexDirection: 'row'
    }
})