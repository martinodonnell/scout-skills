import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as Constants from './Constants'

//may be good to use this to remove some styling of individual questions into seperate component
export default class extends Component { 

    render (){
        const {id,checked,question,handleCheckBox} = this.props

        return (
            <View>
                <View style={styles.checkBoxContainer} onClick={handleCheckBox}>
                    <CheckBox style={styles.checkBox} isChecked={checked}/>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{question}</Text>
                </View>
            </View>                  
            
        )
    }
}


const styles = StyleSheet.create({
    checkBoxContainer:{
        flex:1,
        backgroundColor:'blue',
    },   
    textContainer:{
        flex:4
    },  
    checkBox:{

    },
    text:{
        fontSize:20
    },
})


  





