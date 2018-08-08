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
        name: '',
        details: ''
    };

    create1 = () => {

        this.props.onCreate1(this.state.name)
            .then(data => {
                    console.log('SUCCESS', data);
                },
                error => console.log('ERROR', error))
            .catch(err => console.log('ERR', err))
    };

    create2 = () => {

        let {name, details} = this.state;
        this.props.onCreate2({name, details})
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
                <TextInput placeholder='Enter Test 1/2 name...'
                           onChangeText={(name) => this.setState({name})}/>
                <TextInput placeholder='Enter Test 2 details...'
                           onChangeText={(details) => this.setState({details})}/>
                <Button title='Create 1!'
                        onPress={this.create1}/>
                <Button title='Create 2!'
                        onPress={this.create2}/>
            </View>
        );
    }
}

export default compose(
    GraphQL.operations.CreateTest1,
    GraphQL.operations.CreateTest2
)(Test);

// export default Test;

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
