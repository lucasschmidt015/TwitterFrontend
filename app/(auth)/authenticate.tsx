import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useGlobalSearchParams } from 'expo-router';
import { authenticate } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';

export default function Authenticate() {

    const [code, setCode] = useState('');
    const { email } = useGlobalSearchParams();

    const { updateAuthToken } = useAuth();

    const onPressConfirm = async () => {
        
      try {

        const res = await authenticate({ email: email as string, emailToken: code as string });

        await updateAuthToken(res.accessToken, res.refreshToken);

      } catch (err) {
        Alert.alert('Error', "Email code doesn't metch");
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm your email</Text>
      <TextInput 
        value={code}
        onChangeText={setCode}
        placeholder='Login Code' 
        style={styles.input}/>

      <Pressable style={styles.button} onPress={onPressConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    label: {
      fontSize: 24,
      marginVertical: 5,
      color: 'gray',
    },
    error: {
      marginVertical: 5,
      color: 'red',
    },
    input: {
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      padding: 10,
      fontSize: 20,
      marginVertical: 5,
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#050A12',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginVertical: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });