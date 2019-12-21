import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box'


export default class ListQuestions extends Component { 

    constructor(props){
        super(props);

        this.state = {
            questions:this.props.questions[this.props.level-1]
        }
    }


    handleCheckBox(id){
        var data = this.state.questions;
        var index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        this.setState({questions:data});
    }     
          
    
    render (){
        return (
            this.state.questions.map((cb) => {
                return (
                   <View key={cb.id}>
                        <CheckBox isChecked={cb.checked} onClick={()=>this.handleCheckBox(cb.id)}/>
                        <Text>{cb.question}</Text>
                    </View>
                    
                )
            })
        )
    }
}



  





