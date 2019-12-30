import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as Constants from './Constants'

export default class ListQuestions extends Component { 

    constructor(props){
        super(props);

        this.state = {
            questions:this.props.questions
        }
    }

    handleCheckBox(id){
        var data = this.state.questions;
        var index = data.questions[this.props.level-1].findIndex(x => x.id === id);

        data.questions[this.props.level-1][index].checked = !data.questions[this.props.level-1][index].checked;
        this.setState({questions:data});
        this.save(this.state.questions);
    }   

    save = async questions => {
        try {
            await AsyncStorage.setItem('@' + Constants.CAMPING, JSON.stringify(questions))
            console.log('Saved change in state');
        } catch (e) {
            console.log('Failed saving changed state:' + Constants.CAMPING + " " + e);
        }
    }  
          
    
    render (){
        return (
            this.state.questions.questions[this.props.level-1].map((cb) => {
                return (
                   <View key={cb.id} style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <CheckBox isChecked={cb.checked} onClick={()=>this.handleCheckBox(cb.id)}/>
                        <Text>{cb.question}</Text>
                    </View>                   
                )
            })
        )
    }
}



  





