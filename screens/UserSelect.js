import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, AsyncStorage, Text } from 'react-native';
import * as Constants from '../component/Constants'
import * as Font from 'expo-font';
import { db } from '../constants/FireBaseConfig';
import UserCard from '../component/UserCard'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            groupID: 1001
        };
    }

    readUserData() {
        const { groupID } = this.state
        db.ref('/users').orderByChild('groupID').equalTo(groupID).on('value', (snapshot) => {
            let data = snapshot.val();
            let users = Object.values(data);
            console.log("got Users: " + users)
            this.setState({ users });
        })
    }

    componentWillMount() {
        this.readUserData();
    }

    render() {
        const { users } = this.state
        return (
            <View style={styles.container}>
                {users.length > 0 ? (
                    users.map((item, index) => {
                        return (
                            <UserCard key={index} user={item} />
                        )
                    })

                ) : (
                        <Text>Loading</Text>
                    )}
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
    },
});
export default App




