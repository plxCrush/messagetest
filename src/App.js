import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Nav from './navigation/Nav'
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native'
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Nav/>
            </View>
        );
    }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
