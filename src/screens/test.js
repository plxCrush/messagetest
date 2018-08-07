import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";
import {getUUID} from "../utils/uuid";

class Test extends React.Component {

    static navigationOptions = {
        title: 'Test'
    };

    state = {
        name: ''
    };

    create = () => {

        this.props.onCreateTestPost(this.state.name)
            .then(data => {
                    console.log('SUCCESS', data);
                },
                error => console.log('ERROR', error))
            .catch(err => console.log('ERR', err))
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"Start New Conversation"}</Text>
                <TextInput placeholder='Enter Test Post name...'
                           onChangeText={(name) => this.setState({name})}/>
                <Button title='Create!'
                        onPress={this.create}/>
            </View>
        );
    }
}

export default compose(
    GraphQL.operations.CreateTestPost
)(Test);

// export default NewConversation;

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
