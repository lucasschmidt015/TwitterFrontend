import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useGlobalSearchParams } from 'expo-router';
import { authenticate } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';
import { generalContext } from '@/context/GeneralContext';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Authenticate() {

    const [code, setCode] = useState('');
    const { email } = useGlobalSearchParams();

    const { updateAuthToken } = useAuth();
    const { showToast } = generalContext();

    const onPressConfirm = async () => {
        
      try {

        const res = await authenticate({ email: email as string, emailToken: code as string });

        await updateAuthToken(res.accessToken, res.refreshToken);

      } catch (err) {
        showToast({
          type: 'error',
          text1: 'Opss!!!',
          text2: err.message,
          visibilityTime: 5000,
        });
      }
    }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="x-twitter" size={34} color="black" />
        </View>
        <View>
          <Text style={styles.label}>Confirm your email</Text>
          <TextInput 
            value={code}
            onChangeText={setCode}
            placeholder='Login Code' 
            style={styles.input}/>
        </View>

        <Pressable style={styles.button} onPress={onPressConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E0E0E0',
      flex: 1,
      justifyContent: 'center',
      padding: 15,
    },
    formContainer: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 0,
      height: 300,
      overflow: 'hidden',
      justifyContent: 'space-around'
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
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
      padding: 10,
      fontSize: 18,
      marginVertical: 5,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: '#E5E5E5',
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
      fontSize: 17
    },
  });