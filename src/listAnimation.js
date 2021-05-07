import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    StatusBar,
    Image,
    Dimensions,
    Animated,
    Pressable,
    Easing,
} from 'react-native';
import ImageMenu from './imageMenu';

const data = [
    "https://images.pexels.com/photos/6805854/pexels-photo-6805854.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/4507261/pexels-photo-4507261.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/2354399/pexels-photo-2354399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1216345/pexels-photo-1216345.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/3377252/pexels-photo-3377252.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/5858235/pexels-photo-5858235.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
]

const { height, width } = Dimensions.get("screen");

const RenderListAnimation = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const imageRef = React.useRef();

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.listContainer}>
                    <Animated.FlatList
                        data={data}
                        ref={imageRef}
                        keyExtractor={(key) => key}
                        horizontal={true}
                        decelerationRate="fast"
                        onScroll={
                            Animated.event(
                                [
                                    { nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: true }
                            )
                        }
                        snapToInterval={width}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={styles.itemContainer}
                        renderItem={({ item, index }) => {
                            const inputRange = [
                                width * (index - 1),
                                width * (index),
                                width * (index + 1)
                            ]

                            const outputRange = [
                                "-90deg", "0deg", "90deg"
                            ]

                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.8, 1, 0.8],
                                extrapolate: 'clamp',
                            })

                            const rotate = scrollX.interpolate({ inputRange, outputRange });
                            return <View
                                style={styles.imageContainer}>
                                <Animated.Image
                                    source={{ uri: item }} style={{
                                        height: height,
                                        // transform: [{ scale }],
                                        width: width,
                                        borderRadius: 10
                                    }} >
                                </Animated.Image>
                            </View>
                        }}
                    />
                </View>
                <View style={{ position: 'absolute', bottom: 10, width: width, alignItems: 'center', height: 100 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item}
                        horizontal
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        renderItem={({ item, index }) => {
                            const inputRange = [
                                (index - 1) * width,
                                (index) * width,
                                (index + 1) * width
                            ];
                            const outputRange = [
                                1, 1.2, 1
                            ]

                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange,
                                extrapolate: 'clamp'
                            })

                            const scaleX = scrollX.interpolate({
                                inputRange,
                                outputRange: [1, 1.1, 1],
                                extrapolate: 'clamp'
                            })
                            return (
                                <View>
                                    <Pressable onPress={() => imageRef.current.scrollToIndex({ animated: true, index: index })}>
                                        <Animated.Image source={{ uri: item }} style={{
                                            height: 60,
                                            width: 60,
                                            borderRadius: 5,
                                            borderWidth: 2,
                                            borderColor: 'white',
                                            marginHorizontal: 5,
                                            resizeMode: 'cover',
                                            transform: [{ scale }],
                                            padding: 5
                                        }}></Animated.Image>
                                    </Pressable>
                                </View>
                            )
                        }}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        backgroundColor: 'green',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: width,
        alignItems: 'center'
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: "white",
        marginHorizontal: 10
    }
});

export default RenderListAnimation;