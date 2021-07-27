import React from 'react';
import { ViewBase, StyleSheet, View, Alert } from 'react-native';
import { 
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {
    Avatar, 
    Title, 
    Caption, 
    Paragraph, 
    Drawer, 
    Text, 
    TouchableRipple, 
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { logout } from '../utils/user.comm';

export function DrawerContent(props:any){

    const [isDark, setIsDark] = React.useState(false);
    const [backGroundColor, setBackGroundColor] = React.useState("#ffffff");
    const ChangeColor = ()=>{
        setIsDark(!isDark);
        if(!isDark){
            setBackGroundColor("#515A5A");
        }else{
            setBackGroundColor("#ffffff");
        }
    }

    return(
        <View style={{flex:1, backgroundColor:backGroundColor}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop:15}}>
                            <View>
                                <Avatar.Image
                                    source={require('../assets/icon.png')}
                                    size={50}
                                />
                            </View>
                            <View style={{marginLeft:15, flexDirection:"column"}}>
                                <Title style={styles.title}>Nombre Apellido</Title>
                                <Caption style={styles.caption}>@user_name/@user_email</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Caption style={styles.caption}>Orders:</Caption>
                                <Paragraph style={[styles.paragraph,styles.caption]}>15</Paragraph>
                            </View>
                            <View style={styles.section}>
                                <Caption style={styles.caption}>Carrito:</Caption>
                                <Paragraph style={[styles.paragraph,styles.caption]}>13</Paragraph>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section title="Menu" style={styles.bottonDrawerSection}>
                        <DrawerItem
                        icon={({color, size})=>
                            <Icon
                                name="home-outline"
                                color={color}
                                size={size} />}
                            label="Home"
                            onPress={()=>props.navigation.navigate('Home')}
                        />
                         <DrawerItem
                            icon={({color, size})=>
                                <Icon
                                    name="store-outline"
                                    color={color}
                                    size={size} />}
                                label="Premisess"
                                onPress={()=>props.navigation.navigate('Premisess')}
                        />
                        <DrawerItem
                            icon={({color, size})=>
                                <Icon
                                    name="plus-box-multiple"
                                    color={color}
                                    size={size} />}
                                label="addPremisess"
                                onPress={()=>props.navigation.navigate('addPremisess')}
                        />
                          <DrawerItem
                            icon={({color, size})=>
                                <Icon
                                    name="storefront-outline"
                                    color={color}
                                    size={size} />}
                                label="myPremisess"
                                onPress={()=>props.navigation.navigate('myPremisess')}
                        />
                        <DrawerItem
                            icon={({color, size})=>
                                <Icon
                                    name="truck-delivery"
                                    color={color}
                                    size={size} />}
                                label="Ordered"
                                onPress={()=>{}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={()=>{ChangeColor()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottonDrawerSection}>
                <DrawerItem
                    icon={({color, size})=>
                    <Icon
                        name="exit-to-app"
                        color={color}
                        size={size} />}
                    label="Logout"
                    onPress={async ()=>{
                        const result= await logout();
                        if(result.status==200){
                            Alert.alert("Sesion finalizada", result.message)
                            props.navigation.navigate('Login')
                        }else{
                            Alert.alert("Error", result.response)
                        }
                    }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent:{
        flex:1,
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title:{
        fontSize:14,
        marginTop:3,
        fontWeight:"bold",
    },
    caption:{
        fontSize:14,
        lineHeight:14,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
    },
    paragraph:{
        fontWeight:"bold",
        marginRight:3,
    },
    drawerSection:{
        marginTop:15,
    },
    bottonDrawerSection:{
        marginBottom:15,
        borderTopColor:"#f4f4f4",
        borderTopWidth:1
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:16,
    }
})