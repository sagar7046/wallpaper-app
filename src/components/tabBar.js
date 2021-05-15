import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get("screen");
const TAB_WIDTH = width * 0.9;
const SPACING = width * 0.1;

export const TabBar = ({ state, descriptors, navigation, theme }) => {
    console.log(state);
    return (

        <View style={[styles.container, { backgroundColor: theme.PRIMARY_BACKGROUND }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    Animated.spring(translateValue, {
                        toValue: index * tabWidth,
                        useNativeDriver: false
                    }).start();

                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }


                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };
                }
                console.log(isFocused)
                return (
                    <TouchableOpacity
                        onPress={onPress}
                        style={styles.tab}
                        key={index}
                    >
                        <View style={isFocused ? styles.activeItem : styles.tabItem}>
                            <Icon name="home" color="red" size={25}></Icon>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 60,
        position: "absolute",
        bottom: 10,
        left: SPACING / 2,
        borderRadius: 10,
        width: TAB_WIDTH,
        flexDirection: 'row',
        borderRadius: 30,
        opacity: 0.8
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItem: {
        height: 40,
        width: 40,
        alignItems: 'center',
        borderRadius: 40,
        justifyContent: 'center',
    },
    activeItem: {
        height: 40,
        width: 40,
        alignItems: 'center',
        borderRadius: 40,
        justifyContent: 'center',
        backgroundColor: "white",
        elevation: 12
    }
});