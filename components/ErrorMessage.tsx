import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorMessage({ message }: { message: string}) {
  return (
    <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    errorContainer: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(214, 6, 6, 0.75)',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '68%',
        left: '6%',
    },
    errorText: {
        color: 'white',
        fontSize: 15
    }
})