import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePicture } from '@/lib/api/user';
import { useAuth } from '@/context/AuthContext';
import { generalContext } from '@/context/GeneralContext';

export default function UpdateProfilePicture({ closeButton }) {

  const [image, setImage] = useState<{ uri: string, name: string, type: string } | null>(null);
  const [pathImage, setPathImage] = useState< string | null >(null);
  const [isLoading, setIsLoading] = useState< Boolean >(false);

  const { accessToken, loggedUser, setLoggedUser } = useAuth();

  const { driveURL, showToast, defaultImageId } = generalContext();

  useEffect(() => {
    const findPath = () => {
      if (!loggedUser) {
        return;
      }

      const path = loggedUser.image ? `${driveURL}${loggedUser.image}` : `${driveURL}${defaultImageId}`;
      setPathImage(path);
    }


    findPath();
  }, [loggedUser])

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

  const onPressSave = async () => { 
    
    if (!image) {
      return;
    }

    try {
      setIsLoading(true);

      const { updatedUser, success } = await updateProfilePicture(image, accessToken); 

      if (updatedUser) {
        setLoggedUser(updatedUser);
        closeButton();
        showToast({
          type: 'success',
          text1: 'Success!!!',
          text2: success,
          visibilityTime: 5000,
        });
      }
    } catch(err) {
      showToast({
        type: 'error',
        text1: 'Oops!!!',
        text2: err.message,
        visibilityTime: 5000,
      });
    }
    finally {
      setIsLoading(false);
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
              <Image style={styles.profilePicture} source={ image ? { uri: image.uri } : { uri: pathImage } } />
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
            <Button radius={"sm"} type="solid" loading={ isLoading } buttonStyle={{width: 95, marginLeft: 5} } onPress={onPressSave}>
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
      height: '60%',
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