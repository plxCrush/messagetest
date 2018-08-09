import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";

class AddUser extends React.Component {

    static navigationOptions = {
        title: 'Add User'
    };

    handleAdd = (userId) => {

        let {conversation} = this.props.navigation.state.params;

        this.props.onCreateUserConversations({conversationId: conversation.id, userId})
            .then(data => {
                    console.log('SUCCESS', data);

                },
                error => console.log('ERROR', error))
            .catch(err => console.log('ERR', err))
    };

    keyExtractor = (item) => item.id;

    renderItem = (info) => {

        let user = info.item;

        return (
            <TouchableOpacity onPress={(e => this.handleAdd(user.id))}>
                <Text>{user.username}</Text>
            </TouchableOpacity>
        )
    };

    render() {

        let {users, loading} = this.props;

        if (loading)
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>{"Loading..."}</Text>
                </View>
            );

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{"Select user to add!"}</Text>
                <FlatList style={styles.list}
                          data={users}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderItem}/>
            </View>
        );
    }
}

export default compose(
    GraphQL.operations.AllUser,
    GraphQL.operations.CreateUserConversations,
)(AddUser);

// export default AddUser;

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
