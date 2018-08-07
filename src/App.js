import React, {Component} from 'react';
import Nav from './navigation/Nav'
import Amplify, {Auth} from 'aws-amplify';
import * as AWS from 'aws-sdk';
import {withAuthenticator} from 'aws-amplify-react-native'
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {

    render() {
        return (
            <Nav/>
        );
    }
}

export default withAuthenticator(App);
