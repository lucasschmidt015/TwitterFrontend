import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function TextEdit({ placeholder, label, onFocus, onBlur, defaultValue, setValue }) {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        if (onFocus)
            onFocus();

        setIsFocused(true);
    };

    const handleBlur = () => {
        if (onBlur)
            onBlur();

        setIsFocused(false);
    };

    const handleOnChange = (text: string) => {
        if (setValue)
            setValue(text);
    }

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <TextInput
                placeholder={placeholder}
                onChangeText={handleOnChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={defaultValue || ''}
                style={[
                    styles.input,
                    { borderColor: isFocused ? '#adadad' : '#ccc' }, 
                ]}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {

    },
    input: {
        height: 50,
        borderWidth: 3,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
})