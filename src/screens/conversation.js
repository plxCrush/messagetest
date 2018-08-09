import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList} from 'react-native';
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

    componentDidMount() {

        // this.props.subscribeToNewMessage();
    }

    send = () => {

        let {conversation} = this.props.navigation.state.params;
        let {newMessageText} = this.state;
        let createdAt = new Date().toISOString();
        let id = getUUID();

        this.props.onCreateMessage({content: newMessageText, conversationId: conversation.id, createdAt, id})
            .then(data => {
                    console.log('SUCCESS', data);
                    this.setState({newMessageText: ''})
                },
                error => console.log('ERROR', error))
            .catch(err => console.log('ERR', err))
    };

    keyExtractor = (item) => item.id;

    renderItem = (info) => {

        let message = info.item;

        return (
            <View style={styles.messageContainer}>
                <Text style={styles.sender}>{message.sender}</Text>
                <Text style={styles.content}>{message.content}</Text>
            </View>
        )
    };

    render() {

        let {conversation} = this.props.navigation.state.params;
        let {newMessageText} = this.state;
        console.log('PROPS', this.props);
        let {messages} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUser', {conversation})}>
                    <Text style={styles.addUser}>Add User</Text>
                </TouchableOpacity>
                <Text style={styles.welcome}>{conversation.name}</Text>

                <FlatList style={styles.list}
                          data={messages}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderItem}/>

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
    GraphQL.operations.AllMessage,
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
    list: {
        flex: 1
    },
    newMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageContainer: {
        flex: 1,
        margin: 8
    },
    sender: {
        fontSize: 12,
        color: 'blue'
    },
    content: {
        fontSize: 16,
        color: 'gray'
    }
});
