import * as React from 'react';
import {
    View, Text
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './homeScreen';
import PhotoCollection from './photosCollection';
import { TabBar } from './components/tabBar';
import { connect, useSelector } from 'react-redux';
import ImagePreview from './imagePreviewScreen';

export const Search = () => {
    return <View><Text>Search API</Text></View>
}

export const Details = () => {
    return <View><Text>View</Text></View>
}


export const StackContainer = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="view"
                options={{
                    headerShown: false
                }}
                component={PhotoCollection}
            />
            <Stack.Screen
                name="image-preview"
                component={ImagePreview}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export const RootStack = () => {
    const theme = useSelector(state => state.theme.theme);

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            tabBar={(props) => <TabBar {...props} theme={theme}></TabBar>}
            sceneContainerStyle={{
                justifyContent: 'center',
                flex: 1,
                backgroundColor: "yellow"
            }}
        >
            <Tab.Screen name="Home" component={StackContainer}></Tab.Screen>
            <Tab.Screen name="Seacrh" component={Search}></Tab.Screen>
            <Tab.Screen name="wishlist" component={Search}></Tab.Screen>
            <Tab.Screen name="notifications" component={Search}></Tab.Screen>
            <Tab.Screen name="profile" component={Search}></Tab.Screen>
        </Tab.Navigator >
    )
}
