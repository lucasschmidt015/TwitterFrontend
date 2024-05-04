import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Entypo } from '@expo/vector-icons';
import { TweetType } from '@/types';
import IconButton from './iconButton';
import { Link } from 'expo-router';

type TweetProps = {
  tweet: TweetType;
}

const Tweet = ({ tweet }: TweetProps) => {
    return (
      <Link href={`/feed/tweet/${tweet.id}`} asChild> 
        <Pressable style={styles.container}>
            <Image 
                src={tweet.user.image} 
                style={styles.userImage}
            />

            <View style={styles.mainContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.name}>{ tweet.user.name }</Text>
                <Text style={styles.username}>{ tweet.user.username } · 2h</Text>
                <Entypo name="dots-three-horizontal" size={16} color="gray" style={{ marginLeft: 'auto', marginRight: 5 }} />
              </View>

              <Text style={styles.content}>{ tweet.content }</Text>

              { tweet.image && <Image src={tweet.image} style={styles.image}/> }

              <View style={styles.footer}>

                <IconButton iconName='comment' textContent={tweet.numberOfComments} />
                <IconButton iconName='retweet' textContent={tweet.numberOfRetweets} />
                <IconButton iconName='heart' textContent={tweet.numberOfLikes} />
                <IconButton iconName='chart' textContent={tweet.impressions || 0} />
                <IconButton iconName='share-apple'/>

              </View>

            </View>
        </Pressable>
      </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray',
        backgroundColor: "white"
      },
      userImage: {
        width: 50, 
        height: 50, 
        borderRadius: 50
      },
      mainContainer: {
        marginLeft: 10,
        flex: 1, // take all the avaliable space in the screen, but not more them that
      },
      name: {
        fontWeight: '600'
      },
      username: {
        color: 'gray',
        marginLeft: 5
      },
      content: {
        lineHeight: 20,
        marginTop: 5,
      },
      image: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginVertical: 10,
        borderRadius: 15
      },
      footer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between'
      },
})

export default Tweet;