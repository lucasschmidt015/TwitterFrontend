import { Stack, withLayoutContext } from "expo-router";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';
import { useAuth } from "@/context/AuthContext";
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} >
            <View style={styles.profileContainer}>
                <View style={styles.iconRow}>
                    <Image 
                        src='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg' 
                        style={{ width: 32, aspectRatio: 1, borderRadius: 40 }}/>
                    <FontAwesome6 name="circle-question" size={20} color="black" style={{marginRight: 7}} />
                </View>
                <View style={styles.nameContent}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lucas-Kratos</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>@lucas_sibr</Text>
                </View>

                <View style={styles.followersContent}>
                    <Text style={{ fontSize: 12, color: 'gray' }}>0 Following</Text>
                    <Text style={{ fontSize: 12, color: 'gray', marginLeft: 10 }}>0 Followers</Text>
                </View>
                
                <DrawerItemList {...props}/>
            </View>
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
        <Drawer 
            drawerContent={(props) => <CustomDrawerContent {...props} />} 
            screenOptions={{
                drawerActiveBackgroundColor: 'transparent', // No background color for active state
                drawerInactiveTintColor: 'black', // Color for inactive icons
                drawerLabelStyle: {
                    color: 'black', // Ensures label color remains consistent
                    fontSize: 18,
                },
            }}>
            <Drawer.Screen 
                name='(tabs)' 
                options={{ 
                    headerShown: false, 
                    title: 'Profile', 
                    drawerIcon: () =>  <Ionicons name="person-outline" size={30} color="black" />
                }}
            />           
            <Drawer.Screen 
                name='bookmarks' 
                options={{
                    title: 'Bookmarks',
                    drawerIcon: () => <MaterialCommunityIcons name="bookmark-outline" size={30} color="black" />
                }} />           
            <Drawer.Screen 
                name='twitter-blue'
                options={{
                    title: 'Lists',
                    drawerIcon: () => <MaterialIcons name="list-alt" size={30} color="black" />,
                }}/>           
        </Drawer>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        display: 'flex',
        width: '100%',
        paddingHorizontal: 25,
        marginTop: 30
    }, 
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameContent: {
        display: 'flex',
    },
    followersContent: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        marginBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgray',
        
    }
});