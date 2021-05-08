import * as React from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Easing
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ICON_SIZE = 25;
const SPACING = 5;
export const ToggleTheme = (props) => {
    const toggleValue = React.useRef(new Animated.Value(SPACING)).current;

    function Toggle() {
        Animated.timing(toggleValue, {
            toValue: ICON_SIZE,
            useNativeDriver: false,
            duration: 500,
            easing: Easing.elastic
        }).start();
    }


    const toggleSwitch = () => {
        const toValue = toggleValue == ICON_SIZE + (2 * SPACING) ? SPACING : ICON_SIZE + (2 * SPACING);
        console.log(toValue);
        console.log(toggleValue)
        Animated.timing(toggleValue, {
            duration: 500,
            toValue,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.actions.switchTheme}>
                <Icon name="sun-o" size={ICON_SIZE} color="rgb(252, 225, 0)" ></Icon>
            </TouchableOpacity>
            {/* <View style={styles.icon}>
                <Icon name="moon-o" size={ICON_SIZE} color="rgb(252, 225, 0)"></Icon>
            </View> */}
            {/* <Animated.View style={[styles.toggle, { left: toggleValue }]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.toggleButton]}
                    onPress={() => toggleSwitch()}
                />
            </Animated.View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
    },
    icon: {
        paddingRight: SPACING,
        paddingLeft: SPACING
    },
    toggle: {
        position: "absolute",
        top: -3
    },
    toggleButton: {
        height: ICON_SIZE + SPACING,
        width: ICON_SIZE + SPACING,
        backgroundColor: "black",
        borderRadius: ICON_SIZE + SPACING / 2,
        borderColor: "white",
        borderWidth: 2
    }
});
