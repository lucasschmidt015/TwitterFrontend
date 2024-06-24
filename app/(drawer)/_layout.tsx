import { Stack, withLayoutContext } from "expo-router";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';
import { useAuth } from "@/context/AuthContext";
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { generalContext } from "@/context/GeneralContext";

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

function CustomDrawerContent(props) {
    const { driveURL } = generalContext();
    const { loggedUser } = useAuth();

    if (!loggedUser) {
         return <ActivityIndicator />
    }

    return (
        <DrawerContentScrollView {...props} >
            <View style={styles.profileContainer}>
                <View style={styles.iconRow}>
                    <Image 
                        src={loggedUser.image ? `${driveURL}${loggedUser.image}` : `${driveURL}1w3UY2U76y6flPEoA_wanrgHZY2zhUWML`}
                        style={{ width: 54, aspectRatio: 1, borderRadius: 40 }}/>
                    <FontAwesome6 name="circle-question" size={20} color="black" style={{marginRight: 7}} />
                </View>
                <View style={styles.nameContent}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{loggedUser.name}</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>@{loggedUser.username}</Text>
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
            drawerContent={(props) => <CustomDrawerContent {...props} accessToken={accessToken}/>} 
            screenOptions={{
                drawerActiveBackgroundColor: 'transparent', 
                drawerInactiveTintColor: 'black', 
                drawerLabelStyle: {
                    color: 'black', 
                    fontSize: 18,
                },
            }}>
            <Drawer.Screen 
                name='(tabs)' 
                options={{ 
                    headerShown: false, 
                    title: 'Home', 
                    drawerIcon: () =>  <Feather name="home" size={30} color="black" />
                }}
            />       
            <Drawer.Screen 
                name='profile' 
                options={{
                    title: 'Profile',
                    headerShown: false,
                    drawerIcon: () => <Ionicons name="person-outline" size={30} color="black" />
                }} />           
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