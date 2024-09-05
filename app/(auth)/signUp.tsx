import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { createNewUser } from '@/lib/api/user';
import { useRouter } from 'expo-router';
import { generalContext } from '@/context/GeneralContext';

export default function signUp() {
  const { showToast } = generalContext();

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const onPressSignUp = async () => {
    try {

      await createNewUser({name, username: userName, email})

      router.push({pathname: '/authenticate', params: { email }});

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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Create a new account</Text>

          <TextInput 
            value={name}
            onChangeText={setName}
            placeholder='Name  Ex: Ellon Musk' 
            style={styles.input}/>

          <TextInput 
            value={userName}
            onChangeText={setUserName}
            placeholder='User name  Ex:  Ellon_Musk' 
            style={styles.input}/>

          <TextInput 
            value={email}
            onChangeText={setEmail}
            placeholder='Email  Ex: Ellon@Spacex.com' 
            style={styles.input}/>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPressSignUp}>
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
    height: 470,
    overflow: 'hidden'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginVertical: 20
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
    backgroundColor: '#02A8EB',
    width: '99%',
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