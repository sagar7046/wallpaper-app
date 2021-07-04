import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { ENDPOINT, ACCESS_KEY } from '../config/config';

class UserProfile extends React.Component {
    mounted = false;

    fetchUserData = (_username) => {
        fetch(`${ENDPOINT}users/${_username}&client_id=${ACCESS_KEY}`)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { language, theme } = this.props.theme;
        return (
            <View style={{ backgroundColor: "yellow" }}>
                <Text>Profile</Text>
            </View>
        )
    }
}

export const MapStateToProps = (state) => {
    const { theme } = state;
    return { theme };
}
export default connect(MapStateToProps)(UserProfile);

