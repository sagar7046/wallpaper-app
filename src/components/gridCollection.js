import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated, Dimensions, VirtualizedList
} from 'react-native';

const { height, width, fontScale, scale } = Dimensions.get("screen");

const SPACING = 30;
const IMAGE_HEIGHT = height * 0.65;
const IMAGE_WIDTH = width - 2 * SPACING;


export const ListView = ({ data, theme }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <Animated.FlatList
            data={data}
            horizontal
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            snapToInterval={width}
            pagingEnabled
            decelerationRate={'normal'}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => {
                return (
                    <Animated.View style={{ backgroundColor: "red" }}>
                        <View style={[styles.itemContainer]}>
                            <Text>{item}</Text>
                        </View>
                    </Animated.View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: 20
    },
    itemContainer: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        margin: SPACING,
        backgroundColor: 'green',
        borderRadius: SPACING
    }
});