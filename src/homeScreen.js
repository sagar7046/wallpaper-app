import * as React from 'react';
import {
    View,
    StyleSheet,
    Text, TouchableOpacity, ScrollView, FlatList, ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as AppActions from '../redux/themeActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { darkTheme, lightTheme } from '../config/Theme';
import ImageView from './components/ImageList';
import { DAY, MONTH } from '../utility/utility';
import { ENDPOINT, ACCESS_KEY } from '../config/config';


const day = DAY.filter(item => item.key == new Date().getDay());
const month = MONTH.filter(item => item.key == new Date().getMonth());
const date = new Date().getDate();
const CURRENT_DATE = `${day[0].value.toUpperCase()}, ${month[0].value.toUpperCase()} ${date}`;
const ICON_SIZE = 25;

class Home extends React.PureComponent {
    state = {
        userCollection: [],
        isRefreshing: false,
        page: 1
    }
    fetchData = (isRefresh = false) => {
        fetch(`${ENDPOINT}photos?page=${this.state.page}&client_id=${ACCESS_KEY}`)
            .then(res => res.json())
            .then(result => {
                const temp = [];
                result.map(item => temp.push(item));
                if (isRefresh) {
                    this.setState({
                        userCollection: temp
                    })
                    return true;
                }

                this.setState((prevState) => ({
                    userCollection: [...prevState.userCollection, ...temp]
                }), () => { console.log(this.state.userCollection.length) })
            })
    }

    refreshData = async () => {
        this.setState({ isRefreshing: true });
        await this.fetchData(true);
        this.setState({ isRefreshing: false })
        ToastAndroid.show("Refreshed", ToastAndroid.LONG);
    }

    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { language, theme } = this.props.theme;

        return (
            <View style={[styles.container, { backgroundColor: theme.PRIMARY_BACKGROUND }]} >
                <View style={styles.headerContainer}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.date, { color: theme.PRIMARY_TEXT }]}>
                            {CURRENT_DATE}
                        </Text>
                        <Text style={[styles.headerText, { color: theme.SECONDARY_TEXT }]}>
                            {language.greetingText}
                        </Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity onPress={() => {
                            if (theme.mode == "dark") {
                                actions.switchTheme(lightTheme)
                            }
                            else {
                                actions.switchTheme(darkTheme)
                            }
                        }}>
                            <Icon
                                name={theme.mode == "dark" ? "wb-sunny" : "wb-twighlight"}
                                size={ICON_SIZE}
                                color="rgb(252, 225, 0)" ></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.chipsContainer}>
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <TouchableOpacity style={styles.chips}>
                            <Text style={[styles.chipText, {
                                backgroundColor: theme.PRIMARY_TEXT,
                                color: theme.PRIMARY_BACKGROUND
                            }]}>Nature</Text>
                        </TouchableOpacity>
                        <View style={styles.chips}>
                            <Text style={[styles.chipText, {
                                color: theme.SECONDARY_TEXT
                            }]}>City</Text>
                        </View>
                        <View style={styles.chips}>
                            <Text style={[styles.chipText, {
                                color: theme.SECONDARY_TEXT
                            }]}>Animals</Text>
                        </View>
                        <View style={styles.chips}>
                            <Text style={[styles.chipText, {
                                color: theme.SECONDARY_TEXT
                            }]}>Nature</Text>
                        </View>
                        <View style={styles.chips}>
                            <Text style={[styles.chipText, {
                                color: theme.SECONDARY_TEXT
                            }]}>Technology</Text>
                        </View>
                        <View style={styles.chips}>
                            <Text style={[styles.chipText, {
                                color: theme.SECONDARY_TEXT
                            }]}>Superhero</Text>
                        </View>
                    </ScrollView>
                </View>
                {this.state.userCollection.length != 0 ?
                    <FlatList
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshData}
                        data={this.state.userCollection}
                        contentContainerStyle={styles.imageList}
                        keyExtractor={(item) => item.id}
                        onEndReached={() => {
                            this.setState({ page: this.state.page + 1 }, () => {
                                this.fetchData()
                            })
                        }}
                        renderItem={({ item, index }) => {
                            return <ImageView
                                data={item}
                                theme={theme}
                                navigation={this.props.navigation}
                            ></ImageView>
                        }}
                    /> : <></ >}
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    textContainer: {
        padding: 10
    },
    date: {
        fontSize: 18,
        fontFamily: "PTSerif-Bold"
    },
    headerText: {
        fontSize: 30,
        fontWeight: "800",
        color: "white",
        fontFamily: "Anton-Regular"
    },
    themeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 20
    },
    chipsContainer: {
        marginBottom: 30
    },
    chips: {
        marginRight: 10
    },
    chipText: {
        height: 40,
        padding: 10,
        borderRadius: 20,
        fontFamily: "Lobster-Regular",
        fontSize: 16
    },
    imageList: {
        padding: 10,
    }
});

export const MapStateToProps = (state) => {
    const { theme } = state;
    return { theme };
}

const mapDispatchProps = (dispatch) => {
    return { actions: bindActionCreators(AppActions, dispatch) };
}

export default connect(MapStateToProps, mapDispatchProps)(Home);