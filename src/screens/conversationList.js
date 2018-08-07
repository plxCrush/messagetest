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

        return (
            <TouchableOpacity onPress={() => alert(conversation.name)}>
                <Text>{conversation.id+' - '+conversation.name}</Text>
            </TouchableOpacity>
        )
    };

    render() {

        // let {navigate} = this.props.navigation;

        let {loading} = this.props.data;
        let {userConversations} = this.props.data.me.conversations;

        console.log('CONVERSATIONS DATA', this.props.data);

        if (loading)
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>{"Loading..."}</Text>
                </View>
            );

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"Your Conversations!"}</Text>
                <FlatList style={styles.list}
                          data={userConversations}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderItem}/>
            </View>
        );
    }
}

export default compose(
    GraphQL.operations.MyConversations
)(ConversationList);

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
