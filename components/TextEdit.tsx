import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function TextEdit({ placeholder, label }) {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
    setIsFocused(true);
    };

    const handleBlur = () => {
    setIsFocused(false);
    };

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <TextInput
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={[
                    styles.input,
                    { borderColor: isFocused ? '#1DA1F2' : '#ccc' }, 
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
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
})