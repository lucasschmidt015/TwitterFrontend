import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tweetsApi } from "@/lib/api/tweets";
import { useAuth } from "@/context/AuthContext";
import { generalContext } from "@/context/GeneralContext";

export default function NewTweet() {

    const { driveURL, defaultImageId } = generalContext();
    const { loggedUser } = useAuth();
    const { postNewTweet } = tweetsApi();

    const [tweetText, setTweetText] = useState('');
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutateAsync, isLoading, isError, error } = useMutation({
        mutationFn: postNewTweet,
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ['tweets'] });
            queryClient.setQueriesData(['tweets'], (existingTweets) => {
                return [data, ...existingTweets]
            });
        }
    });

    const onTweetPress = async () => {

        try {
            await mutateAsync({ content: tweetText });
            setTweetText('');
            router.back();
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Link href="../" style={{ fontSize: 18 }}>Cancel</Link>
                    {isLoading && <ActivityIndicator/>}
                    <Pressable onPress={onTweetPress} style={styles.button}>
                        <Text style={styles.buttonText}>Tweet</Text>
                    </Pressable>
                </View>

                <View style={styles.inputContainer}>
                    <Image src={loggedUser.image ? `${driveURL}${loggedUser.image}` : `${driveURL}${defaultImageId}`} style={styles.image}/>
                    <TextInput 
                        value={tweetText}
                        placeholder="What's happening?" 
                        multiline 
                        numberOfLines={5} 
                        style={{ flex: 1 }}
                        onChangeText={setTweetText}
                    />
                </View>
                {isError && <Text>Error: {error.message}</Text>}
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
