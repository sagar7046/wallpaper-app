import * as React from 'react';
import {
    View,
    StyleSheet,
    Text, Button
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as AppActions from '../redux/themeActions';
import { darkTheme, lightTheme } from '../config/Theme';
import { hindi, english } from '../config/strings';

const Header = (props) => {
    return <View style={{
        height: 100,
        width: 200,
        backgroundColor: props.theme.PRIMARY_TEXT
    }}>
        <Text>{props.headerText}</Text>
    </View>
}

class Home extends React.Component {
    render() {
        const { language, theme } = this.props.theme;
        const { actions } = this.props;
        return (
            <View style={[styles.container, { backgroundColor: theme.PRIMARY_BACKGROUND }]} >
                <Text style={{ color: theme.PRIMARY_TEXT }}>Home</Text>
                <Text style={{ color: theme.SECONDARY }}>Home</Text>
                {
                    theme.mode === 'dark' ?
                        <Button onPress={() => actions.switchTheme(lightTheme)} title="Dark Theme"></Button> :
                        <Button onPress={() => actions.switchTheme(darkTheme)} title="Light Theme"></Button>
                }
                <Text style={{ color: theme.PRIMARY_BUTTONTEXT }}>{language.appTitle}</Text>
                {
                    language.lang === 'hi-in' ?
                        <Button title="English" onPress={() => this.props.actions.switchLanguage(english)}></Button> :
                        <Button title="Hindi" onPress={() => this.props.actions.switchLanguage(hindi)}></Button>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
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