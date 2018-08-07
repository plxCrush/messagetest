import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getUUID} from '../utils/uuid'

class ConversationList extends React.Component {

    static navigationOptions = {
        title: 'Conversation List'
    };

    render() {

        let {navigate} = this.props.navigation;

        let uuid = getUUID();
        console.log('UUID', uuid);

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"I am Conversation List!"}</Text>
                <Button title='Go Chat'
                        onPress={() => navigate('Chat')}/>
            </View>
        );
    }
}

export default ConversationList;

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
