import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import * as GraphQL from "../graphql";
import {compose} from "react-apollo";
import {getUUID} from "../utils/uuid";

class Conversation extends React.Component {

    static navigationOptions = {
        title: 'Chat Screen'
    };

    state = {
        newMessageText: ''
    };

    send = () => {

        let {newMessageText} = this.state;
        let createdAt = new Date().toISOString();
        let id = getUUID();

        this.props.onCreateMessage({content: newMessageText, conversationId: id, createdAt, id})
            .then(data => {
                    console.log('SUCCESS', data);
                    this.setState({newMessageText: ''})
                },
                error => console.log('ERROR', error))
            .catch(err => console.log('ERR', err))
    };

    render() {

        let {conversation} = this.props.navigation.state.params;
        let {newMessageText} = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUser', {conversation})}>
                    <Text style={styles.addUser}>Add User</Text>
                </TouchableOpacity>
                <Text style={styles.welcome}>{conversation.name}</Text>

                <View style={{flex: 1}}>
                </View>
                {/*PUT MESSAGE FLAT LIST HERE*/}

                <View style={styles.newMessageContainer}>
                    <TextInput placeholder='Enter message here...'
                               value={newMessageText}
                               onChangeText={(newMessageText) => this.setState({newMessageText})}
                    />
                    <Button title='Send!'
                            onPress={this.send}/>

                </View>

            </View>
        );
    }
}

export default compose(
    GraphQL.operations.CreateMessage
)(Conversation);

// export default Conversation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    addUser: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'green'
    },
    newMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
