
import { API_URL, authToken } from "./config";

export const listTweets = async () => {
    try {
      const res = await fetch(`${API_URL}/tweet`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      if (res.status == 401) {
        throw new Error("Not authorized. Please sign in");
      }

      if (res.status !== 200) {
        throw new Error("Error fetching tweets");
      }

      return await res.json();
      
    } catch (e) {
      throw new Error("Error fetching tweets");
    }
}

export const getSingleTweet = async (tweetId: string) => {
  try {
    const res = await fetch(`${API_URL}/tweet/${tweetId}`, {
      headers: { 
        Authorization: `Bearer ${authToken}`
      }
    });

    if (res.status == 401) {
      throw new Error("Not authorized. Please sign in");
    }

    if (res.status !== 200) {
      throw new Error("Error fetching the tweet");
    }

    return await res.json();
    
  } catch (e) {
    throw new Error("Error fetching a specific tweet.");
  }
}