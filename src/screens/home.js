import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';

export class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {

        Auth.currentAuthenticatedUser()
            .then(user => console.log('Current user', user))
            .catch(err => console.log('Cant get cur user', err));

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
    }
});
