import React, { Component } from 'react';
import { StyleSheet, View,Text} from 'react-native';


export default class extends Component {
   
   constructor(props){
        super(props);
       
   }

   render() {
      const {section,name,id} = this.props.user
      return (            
            <View>
                
                <Text>{section}</Text>
            </View>
            
               
      )
   }
}






