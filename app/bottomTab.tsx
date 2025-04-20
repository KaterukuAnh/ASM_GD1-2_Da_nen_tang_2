import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Search from './search';
import Notification from './notification';
import Profile from './profile';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#000",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    paddingTop: 5,
                    height: 50,
                },
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={require('../assets/images/home.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: color, width: size, height: size },
                                ]}
                            />
                            {focused && <View style={styles.dot} />}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={require('../assets/images/search.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: color, width: size, height: size },
                                ]}
                            />
                            {focused && <View style={styles.dot} />}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={require('../assets/images/bell.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: color, width: size, height: size },
                                ]}
                            />
                            {focused && <View style={styles.dot} />}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={require('../assets/images/user.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: color, width: size, height: size },
                                ]}
                            />
                            {focused && <View style={styles.dot} />}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: "#000",
        borderRadius: 3,
        marginTop: 5,
    },
});

export default BottomTabNavigator;
