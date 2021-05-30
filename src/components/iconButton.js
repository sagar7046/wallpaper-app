import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export const IconButton = ({ icon, theme }) => {

    return (
        <View
            style={[styles.container, { backgroundColor: theme.PRIMARY_BACKGROUND }]}>
            <Icon name={icon} size={30} color={theme.SECONDARY_TEXT}></Icon>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        backgroundColor: "red",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})