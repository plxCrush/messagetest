import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {compose} from "react-apollo";
import * as GraphQL from "../graphql";

class AddUser extends React.Component {

    static navigationOptions = {
        title: 'Add User'
    };

    keyExtractor = (item) => item.id;

    renderItem = (info) => {

        let user = info.item;

        return (
            <TouchableOpacity onPress={() => alert(user.username)}>
                <Text>{user.id+' - '+user.username}</Text>
            </TouchableOpacity>
        )
    };

    render() {

        let {allUser, loading} = this.props.data;
        console.log(data);

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
                          data={allUser}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderItem}/>
            </View>
        );
    }
}

// export default compose(
//     GraphQL.operations.AllUsers
// )(AddUser);

export default AddUser;

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
