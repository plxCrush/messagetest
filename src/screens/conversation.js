import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Conversation extends React.Component {

    static navigationOptions = {
        title: 'Chat Screen'
    };

    render() {

        let {conversation} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{conversation.name}</Text>
            </View>
        );
    }
}

export default Conversation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
