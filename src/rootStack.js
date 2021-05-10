import * as React from 'react';
import {
    View, Text
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './homeScreen';
import PhotoCollection from './photosCollection';

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
        </Stack.Navigator>
    )
}

export const RootStack = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={StackContainer}></Tab.Screen>
            <Tab.Screen name="Seacrh" component={Search}></Tab.Screen>
        </Tab.Navigator >
    )
}