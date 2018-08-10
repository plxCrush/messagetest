import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import { compose } from 'react-apollo';
import * as GraphQL from '../graphql';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    state = {
        loading: false,
        username: ''
    };

    componentWillMount() {

        this.setState({loading: true});
        Auth.currentAuthenticatedUser().then(
            user => {
                let {payload} = user.signInUserSession.accessToken;
                let username = payload.username;
                this.props.onCreateUser({username})
                    .then(data => {
                            this.setState({loading: false});
                            this.setState({username})
                        },
                        error => this.setState({loading: false}))
                    .catch(err => this.setState({loading: false}))
            }
        );
    }

    render() {

        let {loading, username} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome Home!</Text>
                {
                    loading ?
                        <Text>Loading...</Text>
                        :
                        <Text style={styles.user}>{username}</Text>
                }
                <Button title='Logout'
                        color='red'
                        onPress={() => Auth.signOut()}/>
            </View>
        );
    }
}

export default compose(
    GraphQL.operations.CreateUser,
)(Home);

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
