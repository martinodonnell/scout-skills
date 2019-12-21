import React, {Component} from 'react';
import {Container,Text,Button} from 'native-base';

export default class SkillSelect extends Component { 

  constructor(props){
    super(props);
    
  }


static navigationOptions = {
    title: 'Adventure Skills',
  };
  render(){
    const {navigate} = this.props.navigation;

    return (  
      <Container>
        <Button onPress={() => navigate('Skill', {level: 1})}>
            <Text>Camping Level 1</Text>
        </Button>     
      </Container>
    );
  }
}



  





