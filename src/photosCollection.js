import * as React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { ListView } from './components/gridCollection';

class PhotoCollection extends React.PureComponent {
    render() {
        const { theme } = this.props.theme;

        return (
            <View style={[styles.container, {
                backgroundColor: theme.PRIMARY_BACKGROUND
            }]}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.subHeader, { color: theme.PRIMARY_TEXT }]}>
                        {"Collections".toUpperCase()}
                    </Text>
                    <Text style={[styles.header, { color: theme.SECONDARY_TEXT }]}>
                        Plants
                    </Text>
                </View>
                <SafeAreaView style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    <ListView data={[1, 2, 3]} theme={theme}></ListView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        padding: 10,
        marginTop: 20
    },
    subHeader: {
        fontSize: 18,
        fontFamily: "PTSerif-Regular"
    },
    header: {
        fontSize: 30,
        fontFamily: "Anton-Regular",
        fontWeight: "800"
    }
})

export const MapStateToProps = (state) => {
    const { theme } = state;
    return { theme };
}

export default connect(MapStateToProps)(PhotoCollection);

