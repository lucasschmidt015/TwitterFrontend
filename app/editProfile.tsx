import { View, Text, StyleSheet } from 'react-native'
import TextEdit from '@/components/TextEdit';
import React from 'react'

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* <Text>Update Profile</Text> */}
        <TextEdit placeholder="Teste" label="Name" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: "center"
    },
    formContainer: {
        width: '85%',
    }
});