import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated, Dimensions,
    Image
} from 'react-native';
import { IconButton } from '../components/iconButton';

const { height, width, fontScale, scale } = Dimensions.get("screen");
const IMAGE_HEIGHT = height * 0.65;
const IMAGE_WIDTH = width * 0.8;
const SPACING = (width - IMAGE_WIDTH) / 2;

export const ListView = ({ data, theme }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const items = [{ urls: "", id: 'dumm1' }, ...data, { key: 10, urls: "", id: 'dummy2' }]
    return (
        <Animated.FlatList
            data={items}
            horizontal
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            snapToInterval={IMAGE_WIDTH}
            pagingEnabled
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
                            <Image
                                style={styles.itemContainer}
                                source={{ uri: item.urls.regular }}
                                resizeMode="cover"
                            />
                            <View style={styles.buttonContainer}>
                                <IconButton icon="heart" theme={theme}></IconButton>
                                <IconButton icon="download" theme={theme}></IconButton>
                                <IconButton icon="share" theme={theme}></IconButton>
                            </View>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        borderRadius: SPACING
    },
    buttonContainer: {
        width: IMAGE_WIDTH,
        flexDirection: "row",
        top: -SPACING - 30,
        justifyContent: 'space-evenly'
    }
});