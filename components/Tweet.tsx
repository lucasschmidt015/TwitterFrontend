import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

import { User, TweetType } from '@/types';

type TweetProps = {
  tweet: TweetType;
}

const Tweet = ({ tweet }: TweetProps) => {
    return (
        <View style={styles.container}>
            <Image 
                src={tweet.user.image} 
                style={styles.userImage}
            />

            <View style={styles.mainContainer}>
            <Text style={styles.name}>{ tweet.user.name }</Text>
            <Text style={styles.content}>{ tweet.content }</Text>
            </View>
        </View>
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
      content: {
        lineHeight: 20,
        marginTop: 5,
      }
})

export default Tweet;