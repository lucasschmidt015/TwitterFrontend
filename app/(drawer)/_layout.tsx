import { Stack, withLayoutContext } from "expo-router";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { ActivityIndicator, Text } from 'react-native';
import { useAuth } from "@/context/AuthContext";

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} >
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>Vadim</Text>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return (
            <ActivityIndicator />
        )
    }

    return (
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='(tabs)' options={{ headerShown: false, title: 'Home' }}/>           
            <Drawer.Screen name='bookmarks' options={{ title: 'Bookmarks' }}/>           
            <Drawer.Screen name='twitter-blue' options={{ title: 'Twitter Blue' }}/>           
        </Drawer>
    )
}