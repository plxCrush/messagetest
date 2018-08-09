import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";
import {getUUID} from "../utils/uuid";
import {Auth} from "aws-amplify/lib/index";

class NewConversation extends React.Component {

    static navigationOptions = {
        title: 'Start New Chat'
    };

    state = {
        name: ''
    };

    create = () => {

        Auth.currentAuthenticatedUser().then(
            user => {
                let {payload} = user.signInUserSession.accessToken;
                let userId = payload.sub;
                let {name} = this.state;
                let id = getUUID();
                this.props.onCreateConversation({id, name})
                    .then(data => {
                            console.log('SUCCESS', data);
                            this.props.onCreateUserConversations({conversationId: id, userId})
                                .then(data => {
                                        console.log('SUCCESS', data);

                                    },
                                    error => console.log('ERROR', error))
                                .catch(err => console.log('ERR', err))
                        },
                        error => console.log('ERROR', error))
                    .catch(err => console.log('ERR', err))
            });
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"Start New Conversation"}</Text>
                <TextInput placeholder='Enter conversation name...'
                           onChangeText={(name) => this.setState({name})}/>
                <Button title='Create!'
                        onPress={this.create}/>
            </View>
        );
    }
}

// export default compose(
//     GraphQL.operations.CreateConversation,
//     GraphQL.operations.CreateUserConversations
// )(NewConversation);

export default NewConversation;

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
