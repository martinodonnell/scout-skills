import React, { Component }from 'react';
import { StyleSheet, Text, View,Image,Button,TouchableOpacity,TextInput} from 'react-native';
import {db,auth} from '../../constants/FireBaseConfig';
import { Actions } from 'react-native-router-flux';

export default class extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:"martin@test.com",
            password:"testtest123",
            section:"Scout",
            groupID:1001,
            loading:false,
            errorMessage:"",

        };
   }

   async signUp(){
      this.setState({loading:true,errorMessage:""})
      const {email,password,groupID,section} = this.state
      await auth.createUserWithEmailAndPassword(email,password).then(()=> {
          userId = auth.currentUser.uid
          db.ref('users/' + userId).set({
            groupID: groupID,
            section:section
            
          }).then(function() {
            console.log("user details successfully added")
            Actions.home()

          }).catch((error) =>{
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error adding new user details to user table:" + errorCode +":"+errorMessage)
           

        });
      }).catch((error) =>{
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error adding new user" + errorCode +":"+errorMessage)
            this.setState({errorMessage})


      });
      this.setState({loading:false})
    }

    async signIn(){
      this.setState({loading:true,errorMessage:""})
      const {email,password,groupID,section} = this.state

      await auth.signInWithEmailAndPassword(email,password).then(()=> {
          console.log("User signed in");
          Actions.home()
      }).catch((error) =>{
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error adding new user" + errorCode +":"+errorMessage)
            this.setState({errorMessage})
      });
      this.setState({loading:false})

    }

    render = () => {  
        return (
          <View style={styles.container}>
            <View>
                <Text style={styles.text}>Email:</Text>
                <TextInput
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                />
            </View>
            <View>
              <Text style={styles.text}>Password:</Text>
              <TextInput
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress = {()=> this.signIn()} disabled={this.state.loading}>
              <Text>Sign In</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress = {()=> this.signUp()} disabled={this.state.loading}>
              <Text>Sign Up</Text>
            </TouchableOpacity>  
            <View>
              <Text>{this.state.errorMessage}</Text>
            </View>
          </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent:'center',
  },
  text:{
    fontSize:25
  },
  button: {
    height:50,//remove this later
    borderColor:'black',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems:'center',
    marginTop:5
  },
});