import { useGlobalSearchParams } from 'expo-router';
import Tweet from '../../../../../components/Tweet';
import { Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getSingleTweet } from '@/lib/api/tweets';


export default function TweetScreen() {

    const { id } = useGlobalSearchParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ['tweet', id],
        queryFn: () => getSingleTweet(id as string)
    })

    if (isLoading) {
        return <ActivityIndicator />
    }
    
    if (error) {
        return <Text> {error.message} </Text>
    }

    return (
        <Tweet tweet={data}/>
    );
}

