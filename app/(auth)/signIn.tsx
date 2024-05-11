import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { login } from '@/lib/api/auth';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const router = useRouter();

    const onPressSignIn = async () => {
        if (email.length) {

          try {

            await login({ email });
            router.push({pathname: '/authenticate', params: { email }});

          } catch(err) {
            Alert.alert('Error', err.message);
          }
        }
        else {
            console.warn('Please, type your Email');
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SignIn or create an account</Text>
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder='Email' 
        style={styles.input}/>

      <Pressable style={styles.button} onPress={onPressSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
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