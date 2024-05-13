
import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { API_URL } from "./config";
import { useAuth } from "@/context/AuthContext";

const TweetsApiContext = createContext({});

const TweetsApiContextProvider = ({ children }: PropsWithChildren) => {

  const { accessToken } = useAuth();

  const listTweets = async () => {

      if (!accessToken) {
        return;
      }

      try {
        const res = await fetch(`${API_URL}/tweet`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
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
        console.log(e);
        throw new Error("Error fetching tweets");
      }
  };

  const getSingleTweet = async (tweetId: string) => {

    if (!accessToken) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/tweet/${tweetId}`, {
        headers: { 
          Authorization: `Bearer ${accessToken}`
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

  const postNewTweet = async (data: { content: string }) => {

    if (!accessToken) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/tweet`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      });

      if (res.status == 401) {
        throw new Error("Not authorized. Please sign in");
      }

      if (res.status !== 201) {
        throw new Error("Error creating tweet");
      }

      return await res.json();

    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }


  return (
    <TweetsApiContext.Provider value={{listTweets, getSingleTweet, postNewTweet}}>
      {children}
    </TweetsApiContext.Provider>
  );
}


export default TweetsApiContextProvider;

export const tweetsApi = () => useContext(TweetsApiContext);