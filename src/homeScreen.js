import * as React from 'react';
import {
    View,
    StyleSheet,
    Text, Button, TouchableOpacity, ScrollView, FlatList, RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as AppActions from '../redux/themeActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { darkTheme, lightTheme } from '../config/Theme';
import { hindi, english } from '../config/strings';
import ImageView from './components/ImageList';
import { DAY, MONTH } from '../utility/utility';
import { ENDPOINT, ACCESS_KEY } from '../config/config';
import { ToggleTheme } from './components/toggleSwitch';


const day = DAY.filter(item => item.key == new Date().getDay());
const month = MONTH.filter(item => item.key == new Date().getMonth());
const date = new Date().getDate();
const CURRENT_DATE = `${day[0].value.toUpperCase()}, ${month[0].value.toUpperCase()} ${date}`;
const ICON_SIZE = 25;

class Home extends React.Component {
    state = {
        userCollection: []
    }
    fetchData = () => {
        fetch(`${ENDPOINT}photos?client_id=${ACCESS_KEY}`)
            .then(res => res.json())
            .then(result => {
                const temp = []
                result.map(item => temp.push(item));
                this.setState({
                    userCollection: temp
                })
            })
    }

    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { language, theme } = this.props.theme;
        const { actions } = this.props;
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
                    <View style={{ marginRight: 10 }}>
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
                        <View style={styles.chips}>
                            <Text style={[styles.chipText, {
                                backgroundColor: theme.PRIMARY_TEXT,
                                color: theme.PRIMARY_BACKGROUND
                            }]}>Nature</Text>
                        </View>
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
                        data={this.state.userCollection}
                        contentContainerStyle={styles.imageList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                            return <ImageView data={item} theme={theme}></ImageView>
                        }}
                    /> : <></>}
            </View>
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