import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage,TouchableWithoutFeedback } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as Constants from './Constants'
import Question from './Question'

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
                        <TouchableWithoutFeedback key={cb.id}  onPress={()=>this.handleCheckBox(cb.id)}>
                            <View style={styles.container}>
                                <CheckBox style={styles.checkBox} isChecked={cb.checked} size={1} onClick={()=>this.handleCheckBox(cb.id)}/>
                                <Text style={styles.text}>{cb.question}</Text>
                            </View>
                        </TouchableWithoutFeedback>  
                                  
                )
            })
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', 
        borderColor:'black',
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor:'white',
        marginHorizontal:10,
        marginBottom:3,
    }, 
     
    checkBox:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },     
    
    text:{
        flex:4,
        fontSize:15
    },   
    
})




  





