import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

/* IMporting nav components */
import SkillSelect from './component/SkillSelect';
import SkillScreen from './component/SkillScreen';



const Home = () => <Text>Home</Text>;
const Stage1 = () => <SkillScreen level={1}/>;
const Stage2 = () => <SkillScreen level={2}/>;

export default class App extends Component { 

  constructor(){
    super();
    this.state = {
      questions:[],
      skill:"Camping",
    }
  }

  componentWillMount(){
    var camping_data= {
                          "questions":[
                            [ 
                              {"id":100,"question":"I know the main personal gear to bring on camp.","checked":false},
                              {"id":101,"question":"I know how to care for my personal camping gear","checked":true},
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
      this.save(camping_data);
      this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const questions = await AsyncStorage.getItem('@Camping')

      if (questions !== null) {
        // this.setState({ questions })
        alert("Yes");
        console.log(this.state.questions)
      }else{
        alert("No");
      }
    } catch (e) {
      alert('-Martin\n Failed to load name.\n\n')
    }
  }

  save = async questions => {
    try {
      await AsyncStorage.setItem('@Camping', JSON.stringify(questions))
      alert('Data successfully saved!')
      this.setState({ questions })
    } catch (e) {
      alert('Failed to save name.')
    }
  }

  render(){
    return (  
      // <View>        
      //   {/* <SkillScreen level={1}/>  */}
      //   {Stage1}
      // </View>

    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>Home</Text>
          </Link>
          <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>About</Text>
          </Link>
          <Link to="/topics" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>Topics</Text>
          </Link>
        </View>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={Stage1} />
        <Route path="/topics" component={Stage2} />
      </View>
    </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

  





