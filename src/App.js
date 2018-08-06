import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Nav from './navigation/Nav'

class App extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Nav/>
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
