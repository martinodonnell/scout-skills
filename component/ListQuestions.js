import React, {Component} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Content,Card,CardItem,CheckBox,Body,ListItem,Container,Header,Left,Right,Icon,Title,Button} from 'native-base';


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

     
    
    render(){        

        let questions = this.state.questions.map((qData,index) =>{
            return (
                <ListItem key={qData.id} onPress={()=>this.handleCheckBox(qData.id)}>
                    <CheckBox checked={qData.checked} />
                    <Body>
                        <Text>{qData.question}</Text>
                    </Body>
                </ListItem>
            )
        });
        
        return (  
            <Container>
                <Header noLeft>
                    <Body>
                        <Text>{this.props.skill} Level {this.props.level}</Text>
                    </Body>                    
                </Header>
                <Content>
                    {questions}
                </Content>


            </Container>            
        );
    }
}



  





