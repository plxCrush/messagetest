import React from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";

class ConversationList extends React.Component {

    static navigationOptions = {
        title: 'Conversation List'
    };

    keyExtractor = (item) => item.conversation.id;

    renderItem = (info) => {

        let conversation = info.item.conversation;
        let {navigate} = this.props.navigation;

        return (
            <TouchableOpacity onPress={() => navigate('Conversation', {conversation})}>
                <Text>{conversation.name}</Text>
            </TouchableOpacity>
        )
    };

    render() {

        let {conversations} = this.props;
        let {loading} = this.props;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"Your Conversations!"}</Text>
                <FlatList style={styles.list}
                          data={conversations}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderItem}/>
            </View>
        );
    }
}

export default compose(
    GraphQL.operations.Me
)(ConversationList);

// export default ConversationList;

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
