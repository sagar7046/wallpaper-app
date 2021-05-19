import React, { useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    Animated
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get("screen");
const TAB_WIDTH = width * 0.9;
const SPACING = width * 0.1;

export const TabBar = ({ state, descriptors, navigation, theme }) => {

    const rotateIcon = useRef(new Animated.Value(0)).current;

    function rotateAnimation(toValue) {
        return (
            Animated.timing(rotateIcon,
                {
                    toValue,
                    useNativeDriver: true,
                    duration: 500
                }
            ).start(() => {
                rotateIcon == 0 ? rotateAnimation(1) : rotateAnimation(0)
            })
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.PRIMARY_TEXT }]}>
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
                var icon = ''
                switch (label) {
                    case "Home":
                        icon = "home";
                        break;
                    case "Seacrh":
                        icon = "search";
                        break;
                    case "wishlist":
                        icon = "plus";
                        break;
                    case "notifications":
                        icon = "bell-o";
                        break;
                    case "profile":
                        icon = "user-o";
                        break;
                }

                const rotate = rotateIcon.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                    extrapolate: "clamp"
                })

                return (
                    <TouchableOpacity
                        style={styles.tab}
                        key={index}
                        onPress={() => rotateAnimation(1)}
                    >
                        {
                            label === "wishlist" ?
                                <Animated.View style={{
                                    height: 70,
                                    width: 70,
                                    backgroundColor: "red",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 60,
                                    transform: [{ rotate }]
                                }}>
                                    <Icon name={icon} color={theme.PRIMARY_BACKGROUND} size={25}></Icon>
                                </Animated.View> :
                                <View style={
                                    isFocused ?
                                        [styles.activeItem, { backgroundColor: theme.SECONDARY_TEXT }] :
                                        styles.tabItem}
                                >
                                    <Icon name={icon} color={theme.PRIMARY_BACKGROUND} size={25}></Icon>
                                </View>
                        }
                    </TouchableOpacity>
                )
            })}
        </View >
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
        justifyContent: 'center',
        borderRadius: 40,
    },
    activeItem: {
        height: 40,
        justifyContent: 'center',
        width: 40,
        alignItems: 'center',
        borderRadius: 40,
        elevation: 12
    }
});