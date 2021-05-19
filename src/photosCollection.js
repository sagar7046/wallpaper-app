import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import { connect } from 'react-redux';
import { ListView } from './components/gridCollection';
import { ENDPOINT, ACCESS_KEY } from '../config/config';
import Icon from 'react-native-vector-icons/MaterialIcons';


class PhotoCollection extends React.PureComponent {
    componentMounted = false;
    state = {
        usersPhotoCollection: []
    }

    fetchData = (username) => {
        fetch(`${ENDPOINT}users/${username}/photos?client_id=${ACCESS_KEY}`)
            .then(res => res.json())
            .then(result => {
                const temp = [];
                result.map(item => temp.push(item));
                this.setState({
                    usersPhotoCollection: temp
                }, () => {
                    console.log(this.state.usersPhotoCollection[0][0])
                })
            })
    }

    componentDidMount() {
        const { route } = this.props
        this.componentMounted = true;
        if (this.componentMounted) {
            this.fetchData(route.params.userName);
        }
    }

    componentWillUnmount() {
        this.componentMounted = false
    }


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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={[styles.header, { color: theme.SECONDARY_TEXT }]}>
                            Plants
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 10
                        }}>
                            <Icon name="view-carousel" color="white" size={32} style={{ marginRight: 20 }}></Icon>
                            <Icon name="grid-view" color="white" size={30}></Icon>
                        </View>
                    </View>
                </View>
                <SafeAreaView style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    <ListView data={this.state.usersPhotoCollection} theme={theme}></ListView>
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
        marginTop: 10,
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

