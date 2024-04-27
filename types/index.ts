export type User = {
    id: String;
    name: String;
    username: String;
    image?: String;  
}
  
export type TweetType = {
    id: String;
    content: String;
    user: User
    createdAt: String;
    image?: String;
    numberOfComments?: number;
    numberOfRetweets?: number;
    numberOfLikes?: number;
    impressions?: number;
}