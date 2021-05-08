import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");
const SPACING = 20;

const ImageView = ({ data, theme }) => {

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: theme.SECONDARY_TEXT,
                width: width - SPACING,
                height: width - 2 * SPACING,
                borderRadius: 25
            }}>
                <Image
                    style={styles.image}
                    source={{ uri: data.urls.regular }}
                    resizeMode="cover"
                    resizeMethod="resize"
                    onProgress={(native) => { console.log(native.nativeEvent.loaded) }}
                />
            </View>
            <View style={styles.profileContainer}>
                <View style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25
                }}>
                    <Image
                        style={styles.profileImg}
                        source={{ uri: data.user.profile_image.medium }}
                    />
                </View>
                <View style={styles.profileDetail}>
                    <Text style={[styles.text, { color: theme.SECONDARY_TEXT }]}>{capitalize(data.user.username)}</Text>
                    <Text style={[styles.timeStamp, { color: theme.SECONDARY_TEXT }]}>{data.user.total_photos} photos</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - SPACING,
        height: width - 2 * SPACING,
        marginVertical: 10
    },
    image: {
        width: width - SPACING,
        height: width - 2 * SPACING,
        borderRadius: 25
    },
    profileContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImg: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    profileDetail: {
        paddingLeft: 10,
    },
    text: {
        fontSize: 18,
        fontFamily: "PTSerif-Bold"
    },
    timeStamp: {
        fontSize: 14,
        fontWeight: "700"
    }
})
export default ImageView;