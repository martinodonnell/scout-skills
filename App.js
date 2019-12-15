import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,Button,StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListQuestions from './component/ListQuestions';


class App extends Component { 

  constructor(){
    super();
    this.state = {
      questions:[]
    }

  }
  getData(){
      var camping_data= {
                          "current_level":1,
                          "questions":[
                            [ 
                              {"id":100,"question":"I know the main personal gear to bring on camp.","checked":false},
                              {"id":101,"question":"I know how to care for my personal camping gear","checked":false},
                              {"id":102,"question":"I know what clothes I should bring on camp","checked":false},
                              {"id":103,"question":"I know how to set out my sleeping area for a good night‘s sleep","checked":false},
                              {"id":104,"question":"I can collect small sticks suitable for fire-making","checked":false},
                              {"id":105,"question":"I know about the Buddy System","checked":false},
                              {"id":106,"question":"I can pack my rucksack for camp","checked":false},
                              {"id":107,"question":"I can keep my camping gear neat and tidy while on camp","checked":false},
                              {"id":108,"question":"I know the different emergency services that are available and how and when to call them","checked":false},
                              {"id":109,"question":"I know the main parts of a tent","checked":false},
                              {"id":110,"question":"I can help pitch a tent","checked":false},
                              {"id":111,"question":"I have spent at least one night on camp","checked":false}
                            ],
                            [
                              {"id":201,"question":"I know about the food pyramid and can discuss it with a Scouter","checked":false},
                              {"id":202,"question":"I know about food hygiene","checked":false},
                              {"id":203,"question":"I can get a weather forecast","checked":false},
                              {"id":204,"question":"I can help prepare food for cooking on camp","checked":false},
                              {"id":205,"question":"I know how I would get help if someone is hurt","checked":false},
                              {"id":206,"question":"I know how to behave safely around fires","checked":false},
                              {"id":207,"question":"I can demonstrate my understanding of the fire triangle","checked":false},
                              {"id":208,"question":"I know how to be safe while cooking","checked":false},
                              {"id":209,"question":" I understand why I should follow directions from an instructor","checked":false},
                              {"id":210,"question":"I have spent at least two nights on camp (outside)","checked":false}
                            ]
                          ]
                        };
      this.setState({questions:camping_data.questions});
  }

  componentWillMount(){
    this.getData();
  }

  render(){
    let questions = this.props.data
    return (  
      <ListQuestions questions={this.state.questions} skill="Camping" level={1}/>
    );
  }
}

export default App;


  





