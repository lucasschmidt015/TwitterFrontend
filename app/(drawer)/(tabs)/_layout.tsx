import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useNavigation } from 'expo-router';
import { Pressable, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/context/AuthContext';
import { Ionicons, FontAwesome6, Feather } from '@expo/vector-icons';

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

        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <FontAwesome6 name="x-twitter" size={28} color={Colors[colorScheme ?? 'light'].text} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
              <Pressable onPress={handleLogout}> 
                {({ pressed }) => (
                  <Feather name="settings" size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
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
