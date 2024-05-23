import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/X.jpeg')} style={styles.backgroundImage}/>
      <View style={styles.infoArea}>
        <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 2 }}>Lucas-Kratos</Text>
            <Text style={{ color: 'gray' }}>@lucas_sibr</Text>
        </View>
        <Text style={{ color: 'gray', fontSize: 14 }}>My bio here</Text>
        
        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <EvilIcons name="calendar" size={22} color="gray" />
            <Text style={{ color: 'gray', marginLeft: 5 }}>Joined March 2017</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{color: 'black', fontSize: 15, marginRight: 5}}>0</Text>
            <Text style={{color: 'gray', fontSize: 15, marginRight: 15}}>following</Text>
            <Text style={{color: 'black', fontSize: 15, marginRight: 5}}>0</Text>
            <Text style={{color: 'gray', fontSize: 15, marginRight: 15}}>followers</Text>
        </View>
      </View>

      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} src='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    backgroundImage: {
        width: 500,
        height: 250,
        alignSelf: 'center',
    },
    infoArea: {
        marginTop: 70,
        paddingLeft: 22,
        color: 'black'
    },
    profilePictureContainer: {
        position: 'absolute',
        top: 202,
        left: 15
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFF'
    }
})