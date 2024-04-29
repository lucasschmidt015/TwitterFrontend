import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

const user = {
    id: '123456789',
    name: 'Jeff B',
    username: 'bezos',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg',
}

export default function NewTweet() {

    const [tweetText, setTweetText] = useState('');
    const router = useRouter();

    const onTweetPress = () => {
        setTweetText('');
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Link href="../" style={{ fontSize: 18 }}>Cancel</Link>
                    
                    <Pressable onPress={onTweetPress} style={styles.button}>
                        <Text style={styles.buttonText}>Tweet</Text>
                    </Pressable>
                </View>

                <View style={styles.inputContainer}>
                    <Image src={user.image} style={styles.image}/>
                    <TextInput 
                        value={tweetText}
                        placeholder="What's happening?" 
                        multiline 
                        numberOfLines={5} 
                        style={{ flex: 1 }}
                        onChangeText={setTweetText}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 30,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#1C9BF0',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
});
