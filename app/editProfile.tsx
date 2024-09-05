import { View, StyleSheet, Image, Platform  } from 'react-native'
import { useState } from 'react';
import TextEdit from '@/components/TextEdit';
import React from 'react'
import { generalContext } from '@/context/GeneralContext';
import { useAuth } from '@/context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Icon } from '@rneui/themed';

export default function EditProfile() {

  const { loggedUser } = useAuth();
  const { driveURL, defaultImageId } = generalContext();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [name, setName] = useState(loggedUser.name)
  const [birthdayDate, setBirthdayDate] = useState(null);
  const [bio, setBio] = useState(loggedUser.bio)

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBirthdayDate(currentDate.toString());
  }

  return (
    <View style={styles.container}>
        <Image  style={loggedUser.image ? styles.profilePicture : styles.profilePictureEmpty} src={loggedUser.image ? `${driveURL}${loggedUser.image}`: `${driveURL}${defaultImageId}`} />
        <View style={styles.textInputs}>
          <TextEdit placeholder="Type your name" label="Name" defaultValue={name} setValue={setName}/>
          <TextEdit placeholder="Type your birthday date" label="Birthday date" defaultValue={birthdayDate} setValue={setBirthdayDate} onFocus={() => setShow(true)} onBlur={() => setShow(false)}/>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <TextEdit placeholder="Enter a nice bio, or anything else" defaultValue={bio} setValue={setBio} label="Bio" />
        </View>
        <View style={styles.buttonsRow}>
          <Button color="darkred" containerStyle={{ width: 100, height: 70, paddingRight: 10 }}>Cancel</Button>
          <Button radius={"sm"} type="solid" containerStyle={{ width: 100, height: 70, paddingRight: 10 }}>
            Save
            <Icon name="save" color="white" />
          </Button>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#eeecec',
    },
    formContainer: {
        width: '85%',
    },
    profilePicture: {
      width: 130,
      height: 130,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: '#FFF'
  },
  profilePictureEmpty: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#c4c2c2',
    backgroundColor: '#ffffff',
  },
  textInputs: {
    width: '80%',
  },
  buttonsRow: {
    marginTop: 40,
    display: 'flex',
    flexDirection: "row",
    width: "85%",
    justifyContent: 'flex-end'
  }
});