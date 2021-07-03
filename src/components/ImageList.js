import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, Easing, TouchableHighlight, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get("screen");
const SPACING = 20;

const ImageView = ({ data, theme, navigation }) => {
    const thumbnailOpacity = React.useRef(new Animated.Value(0)).current;
    const imageOpacity = React.useRef(new Animated.Value(0)).current;

    console.log(data.user.username);

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    function onThumbnailLoad() {
        Animated.timing(thumbnailOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.cubic
        }).start();
    }

    function onImageLoad() {
        Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.cubic
        }).start();
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("view", {
                userName: data.user.username
            })}
        >
            <View style={{
                width: width - SPACING,
                height: width - 2 * SPACING,
                borderRadius: 25
            }}>
                <Animated.Image
                    style={[styles.image, { opacity: thumbnailOpacity }]}
                    source={{ uri: data.urls.thumb }}
                    blurRadius={1}
                    resizeMode="cover"
                    resizeMethod="resize"
                    onProgress={(native) => { console.log(native.nativeEvent.loaded) }}
                    onLoad={() => onThumbnailLoad()}
                />
                <Animated.Image
                    style={[styles.image, {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        opacity: imageOpacity
                    }]}
                    source={{ uri: data.urls.regular }}
                    resizeMode="cover"
                    resizeMethod="resize"
                    onProgress={(native) => { console.log(native.nativeEvent.loaded) }}
                    onLoadEnd={() => onImageLoad()}
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
        </TouchableOpacity>
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