import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";

class NewChat extends React.Component {

    static navigationOptions = {
        title: 'Start New Chat'
    };

    state = {
      name: ''
    };

    create = () => {

        alert(this.state.name);
    };

    render() {

        let {data} = this.props;
        console.log(data);

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

export default compose(
    GraphQL.operations.AllUsers
)(NewChat);

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
