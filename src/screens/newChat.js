import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class NewChat extends React.Component {

    static navigationOptions = {
        title: 'Start New Chat'
    };

    render() {

        // console.log('DATA', console.log(this.props.data));

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"Start New Chat!"}</Text>
            </View>
        );
    }
}

// export default compose(graphql(meQuery, {
//     options: {
//         fetchPolicy: 'cache-and-network'
//     }
// }))(NewChat);

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
