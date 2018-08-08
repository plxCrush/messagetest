import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import { compose } from 'react-apollo';
import * as GraphQL from '../graphql';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    componentWillMount() {

    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome Home!</Text>
                <Button title='Logout'
                        color='red'
                        onPress={() => Auth.signOut()}/>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    user: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'green'
    },
});
