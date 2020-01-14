import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View,AsyncStorage,Text} from 'react-native';
import * as Constants from '../component/Constants'
import * as Font from 'expo-font';
import {firebase} from '../constants/FireBaseConfig';
import UserCard from '../component/UserCard'

class App extends Component {
   
   constructor(props){
        super(props);
        this.state = {
            users:[]
        };
     
        this.readUserData()
        this.login()
   }

   readUserData() {
        firebase.database().ref('/users').on('value', snapshot => {
            let data = snapshot.val();
            let users = Object.values(data);
            this.setState({ users });
        });
    }

    login(){
        firebase.auth().signInWithEmailAndPassword("email@emailcom", "password").catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("errorCode:" + errorCode)
            console.log("errorCode:" + errorMessage)

        });

    }

   render() {
      const {users} = this.state
      return (            
            <View style={styles.container}>
                {users.length >0 ? (
                    users.map((item,index) => {
                        return (
                            <UserCard key={index} user={item} />
                        )
                    })
                     
                ):(
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




