import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';

class Conversation extends React.Component {

    static navigationOptions = {
        title: 'Chat Screen'
    };

    state = {
        newMessageText: ''
    };

    send = () => {

        let {newMessageText} = this.state;
        alert(newMessageText);
    };

    render() {

        let {conversation} = this.props.navigation.state.params;

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
                    <TextInput
                              placeholder='Enter message here...'
                              onChangeText={(newMessageText) => this.setState({newMessageText})}
                    />
                    <Button title='Send!'
                            onPress={this.send}/>

                </View>

            </View>
        );
    }
}

export default Conversation;

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
