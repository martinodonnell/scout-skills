import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage,TouchableWithoutFeedback } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as Constants from './Constants'
import Question from './Question'

export default class ListQuestions extends Component { 

    constructor(props){
        super(props);

        this.state = {
            questions:this.props.questions,
            currentLevel:this.props.currentLevel,
            skill:this.props.skill,
        }
    }

    handleCheckBox(id){        
        const {questions,currentLevel} = this.state
        const {level} = this.props
        console.log(level +":"+currentLevel)
        if(level>=currentLevel){
            var index = questions.questions[level-1].findIndex(x => x.id === id);
            questions.questions[level-1][index].checked = !questions.questions[level-1][index].checked;
            this.setState({questions:questions});
            this.save(questions);
        }else{
            console.log("This level is locked because it has been completed")
        }
    }   

    async save(questions){
        const { skill } = this.state
        try {
            await AsyncStorage.setItem('@' + skill,JSON.stringify(questions))
            console.log('Saved ' + skill + ' changes');
        } catch (e) {
            console.log('Failed saving changed state for ' + skill + ":" + e);
        }
    }  
          
    
    render (){
        const {level} = this.props

        return (
            this.state.questions.questions[level-1].map((cb) => {
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




  





