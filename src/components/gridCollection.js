import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated, Dimensions,
    Image,
    TouchableOpacity,
    Pressable,
    Share,
    ToastAndroid
} from 'react-native';
import { IconButton } from '../components/iconButton';
import LottieView from 'lottie-react-native';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs';

const { height, width, fontScale, scale } = Dimensions.get("screen");
const IMAGE_HEIGHT = height * 0.65;
const IMAGE_WIDTH = width * 0.8;
const SPACING = (width - IMAGE_WIDTH) / 2;
const ICON_SPACING = 5;
const ICON_SIZE = 30;
const ICON_CONTAINER_HIEGHT = ICON_SIZE * 3 + ICON_SPACING * 3;

export const ListView = ({ data, theme, route, action, activeindex }) => {

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const items = [{ urls: "", id: 'dumm1', key: 1 }, ...data, { key: 10, urls: "", id: 'dummy2' }]
    const [isLiked, setIsliked] = React.useState(false);
    const [isImageLoaded, setImageLoaded] = React.useState(false);
    const flatListRef = React.useRef(null);
    const [counter, setCounter] = React.useState(0);

    const handleLike = () => {
        setIsliked(true)
        setTimeout(() => {
            setIsliked(false)
        }, 3000);
        setCounter(counter + 1);
        action.setWishlist({ "wishlist": counter });
    }

    const handleShare = async (imageUrl, id) => {
        const username = route.params.userName;
        const URL = `demoapp://view/${username}/${id}`;
        console.log(URL);
        const shareResult = await Share.share({
            message: "MyWallpaper ! Hey, check out this amazing wallpaper \n" + URL,
            title: "My Wallpaper",
            url: URL
        })

        if (shareResult.action == Share.sharedAction) {
            console.log("successfully shared");
            return;
        }
        if (shareResult.action == Share.dismissedAction) {
            console.log("sharing dismmissed");
        }
    }

    const handleDownload = (requestUrl) => {
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;

        RNFS.downloadFile({
            fromUrl: requestUrl,
            toFile: downloadDest
        }).promise.then(res => {
            var imagePath = "file://" + downloadDest;
            CameraRoll.save(imagePath, { type: "photo", album: "ERS" })
                .then(() => {
                    ToastAndroid.show("Image has been downloaded", ToastAndroid.SHORT)
                })
        })
    }


    React.useEffect(() => {
        try {
            if (items.length > 2 && route.params.id != null) {

                const id = route.params.id;
                const targetIndex = items.indexOf(items.filter(item => item.id === id)[0]);

                flatListRef.current.scrollToIndex({
                    index: targetIndex - 1,
                    animated: true
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    })

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={items}
            horizontal
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            snapToInterval={IMAGE_WIDTH}
            pagingEnabled
            getItemLayout={(data, index) => {
                var length = 0;
                var offset = 0;

                if (index == 0 || index == items.length - 1) {
                    length = SPACING
                    offset = SPACING
                } else {
                    length = IMAGE_HEIGHT
                    offset = IMAGE_WIDTH
                }

                return {
                    length: length,
                    offset: offset * index,
                    index
                }
            }}
            decelerationRate={'normal'}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {

                const inputRange = [
                    (index - 2) * IMAGE_WIDTH,
                    (index - 1) * IMAGE_WIDTH,
                    (index) * IMAGE_WIDTH,
                ]

                const outputRange = [0.85, 1, 0.85]

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange,
                    extrapolate: "clamp"
                })

                const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: [50, 1, 50],
                    extrapolate: "clamp"
                })

                if (item.urls == "") {
                    return <View style={{ width: SPACING }}></View>
                }

                else {
                    return (
                        <Animated.View style={[styles.container, {
                            transform: [
                                { scale: scale }
                            ],
                            opacity: scale
                        }]}>
                            <Pressable
                                onLongPress={() => {
                                    console.log(" I m long pressed");
                                }}
                            >
                                <Image
                                    style={styles.itemContainer}
                                    source={{ uri: item.urls.regular }}
                                    resizeMode="cover"
                                    onLoadEnd={() => setImageLoaded(true)}
                                />
                            </Pressable>
                            {isLiked ? <LottieView
                                source={require("../../assets/animation/like.json")}
                                autoPlay
                                loop
                                style={{
                                    height: 120,
                                    width: 120,
                                    position: "absolute",
                                    bottom: ICON_CONTAINER_HIEGHT + ICON_SPACING * 4,
                                    right: -11
                                }}
                            /> : null}
                            {
                                isImageLoaded ? <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={handleLike}
                                    >
                                        <IconButton icon="heart" theme={theme} ></IconButton>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDownload(item.urls.regular)}
                                        activeOpacity={0.8}
                                    >
                                        <IconButton icon="download" theme={theme}></IconButton>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => handleShare(item.urls.regular, item.id)}
                                    >
                                        <IconButton icon="share" theme={theme}></IconButton>
                                    </TouchableOpacity>
                                </View> : null
                            }
                        </Animated.View >
                    )
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    itemContainer: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        borderRadius: SPACING / 2
    },
    buttonContainer: {
        // width: IMAGE_WIDTH,
        // flexDirection: "row",
        // top: -SPACING - 30,
        // justifyContent: 'space-evenly',
        position: "absolute",
        right: ICON_SPACING,
        bottom: ICON_CONTAINER_HIEGHT + ICON_SPACING * 2,
        zIndex: 1
    },
});