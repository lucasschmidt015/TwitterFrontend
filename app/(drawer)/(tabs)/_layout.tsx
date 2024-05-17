import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useNavigation } from 'expo-router';
import { Pressable, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/context/AuthContext';



export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'two',
};

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


function AvatarHeader() {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image 
          src='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg' 
          style={{ width: 30, aspectRatio: 1, borderRadius: 40, marginLeft: 10 }} />
    </Pressable>
  );
}


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { clearLogin } = useAuth();

  //This function will logout the user;
  const handleLogout = () => {
    clearLogin();
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          //Here, we have to change the icon <------------
          headerRight: () => (
              <Pressable onPress={handleLogout}> 
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
          headerLeft: () => (
            <AvatarHeader/>
          )
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
