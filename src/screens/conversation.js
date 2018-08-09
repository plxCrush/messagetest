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

        let {conversation} = this.props.navigation.state.params;
        this.props.subscribeToNewMessage({conversationId: conversation.id});
    }

    send = () => {

        let {conversation} = this.props.navigation.state.params;
        let {newMessageText} = this.state;
        let createdAt = new Date().toISOString();
        let id = getUUID();
        let sender = this.props.me.id;

        this.props.onCreateMessage({content: newMessageText, conversationId: conversation.id, createdAt, id, sender})
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
        let isMine = this.props.me.id === message.sender;

        let container = {
            backgroundColor: 'white',
            flex: 1,
            flexDirection: 'row',
            margin: 10,
            padding: 8,
            justifyContent: isMine ? 'flex-end' : 'flex-start'
        };
        let  sender = {
            fontSize: 12,
            color: isMine ? 'blue' : 'red'
        };
        let content = {
            fontSize: 16,
            color: 'gray',
            textAlign: isMine ? 'right' : 'left'
        };

        return (
            <View style={container}>
                <View>
                    <Text style={sender}>{message.sender}</Text>
                    <Text style={content}>{message.content}</Text>
                </View>
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
                               style={{flex: 1, marginLeft: 16}}
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
    GraphQL.operations.Me,
    GraphQL.operations.AllMessage,
    GraphQL.operations.CreateMessage
)(Conversation);

// export default Conversation;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CBE3EB',
        flex: 1,
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
        backgroundColor: '#0EADE2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    }
});
