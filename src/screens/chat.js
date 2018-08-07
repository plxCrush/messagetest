import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Chat extends React.Component {

    static navigationOptions = {
        title: 'Chat Screen'
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"I am Chat Screen!"}</Text>
            </View>
        );
    }
}

export default Chat;

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
