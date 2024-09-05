import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { login } from '@/lib/api/auth';
import { generalContext } from '@/context/GeneralContext';
import { FontAwesome6 } from '@expo/vector-icons';

export default function SignIn() {

    const { showToast } = generalContext();

    const [email, setEmail] = useState('');
    const router = useRouter();

    const onPressSignIn = async () => {

      try {
        await login({ email });

        router.push({pathname: '/authenticate', params: { email }});

      } catch(err) {
        showToast({
          type: 'error',
          text1: 'Opss!!!',
          text2: err.message,
          visibilityTime: 5000,
        });
      }
    }

    const onPressSignUp = async () => {
      router.push({pathname: '/signUp'});
    }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="x-twitter" size={34} color="black" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>SignIn or create an account</Text>
          <TextInput 
            value={email}
            onChangeText={setEmail}
            placeholder='Email' 
            style={styles.input}/>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPressSignIn}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
            <Pressable style={{ ...styles.button, backgroundColor: '#02A8EB' }} onPress={onPressSignUp}>
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
          </View>
        </View>
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
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 0,
      height: 300,
      overflow: 'hidden'
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
      marginBottom: 20
    },
    inputContainer: {
      height: 150,
    },
    label: {
      fontSize: 22,
      marginVertical: 5,
      color: 'gray',
    },
    input: {
      padding: 10,
      fontSize: 18,
      marginVertical: 15,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: '#E5E5E5',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#050A12',
      width: '49%',
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