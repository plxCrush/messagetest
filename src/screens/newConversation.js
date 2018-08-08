import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";
import {getUUID} from "../utils/uuid";

class NewConversation extends React.Component {

    static navigationOptions = {
        title: 'Start New Chat'
    };

    state = {
        name: ''
    };

    create = () => {

        let conversation = {
          createdAt: new Date().toISOString(),
          id: getUUID().toString(),
          name: this.state.name.toString()
            // createdAt: "12345678",
            // id: "12345678",
            // name: "NO NAME",
        };
        this.props.onCreateNewConversation(conversation)
            .then(data => {
                    console.log('SUCCESS', data);
                },
                error => console.log('ERROR', error))
            .catch(err => console.log('ERR', err))
    };

    render() {

        let {data} = this.props;
        console.log('PROPS', this.props);

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
//     GraphQL.operations.CreateConversation
// )(NewConversation);
//
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
