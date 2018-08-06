import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export class ConversationList extends React.Component {

    static navigationOptions = {
        title: 'Conversation List'
    };

    render() {

        let {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"I am Conversation List!"}</Text>
                <Button title='Go Chat'
                        onPress={() => navigate('Chat')}/>
            </View>
        );
    }
}

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
