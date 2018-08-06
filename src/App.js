import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Nav from './navigation/Nav'
import Amplify, {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native'
import {Rehydrated} from 'aws-appsync-react'
import {ApolloProvider} from 'react-apollo'
import AWSAppSyncClient from 'aws-appsync'
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const client = new AWSAppSyncClient({
    url: aws_exports.graphqlEndpoint,
    region: aws_exports.region,
    auth: {
        type: aws_exports.authenticationType,
        jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
    }
});

class App extends Component {

    render() {
        return (
            <ApolloProvider client={client}>
                <Rehydrated>
                    <Nav/>
                </Rehydrated>
            </ApolloProvider>
        );
    }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
