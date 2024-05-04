import { StyleSheet, FlatList, View, Pressable } from 'react-native';
import Tweet from '@/components/Tweet';
//import tweets from '@/assets/data/tweets';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function FeedScrean() {

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      //Fetch tweets from: http://localhost:3000/tweet/
      const url = "http://localhost:3000/tweet/"
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoyNH0.rqG43IV_xgkYNHZbwt3B0WYd4CgLUwPIafRVsdkR01w';

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        if (res.status !== 200) {
          console.log("Error fetching the API");
        }

        const data = await res.json();

        console.log('data: ', data);

        setTweets(data);
        
      } catch (e) {
        console.log('Error: ', e);
      }
    }

    fetchTweets();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList data={ tweets } renderItem={ ({ item }) => <Tweet tweet={item} />}/>

      <Link href={'/new-tweet'} asChild>
        <Pressable style={styles.floatingButton}>
          <Entypo name="plus" size={45} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  floatingButton: {
    backgroundColor: '#1C9BF0',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

//3:35:49 <---------