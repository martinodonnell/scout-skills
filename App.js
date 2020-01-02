import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage,Button} from 'react-native';
import { NativeRouter, Route, Link,Redirect } from "react-router-native";
import * as Constants from './component/Constants'
import { withRouter } from "react-router-dom";

/* IMporting nav components */
import SkillSelect from './component/SkillSelect';

class App extends Component { 

  constructor(){
    super();
    this.state = {
      questions:[],
      skill:"Camping"
    }
  }

  componentWillMount(){
    var camping_data= {
                          "questions":[
                            [ 
                              {"id":100,"question":"1)I know the main personal gear to bring on camp.","checked":false},
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
                              {"id":201,"question":"2)I know about the food pyramid and can discuss it with a Scouter","checked":false},
                              {"id":202,"question":"I know about food hygiene","checked":false},
                              {"id":203,"question":"I can get a weather forecast","checked":false},
                              {"id":204,"question":"I can help prepare food for cooking on camp","checked":false},
                              {"id":205,"question":"I know how I would get help if someone is hurt","checked":false},
                              {"id":206,"question":"I know how to behave safely around fires","checked":false},
                              {"id":207,"question":"I can demonstrate my understanding of the fire triangle","checked":false},
                              {"id":208,"question":"I know how to be safe while cooking","checked":false},
                              {"id":209,"question":" I understand why I should follow directions from an instructor","checked":false},
                              {"id":210,"question":"I have spent at least two nights on camp (outside)","checked":false}
                            ],
                            [
                              {"id":301,"question":"3)I know how to care for all my personal gear","checked":false},
                              {"id":302,"question":"I know about safe food storage","checked":false},
                              {"id":303,"question":"I can help make a hot drink using a fire","checked":false},
                              {"id":304,"question":"I can help clean up a fireplace after camp","checked":false},
                              {"id":305,"question":"I know how weather can affect our camp","checked":false},
                              {"id":306,"question":"I know why we bring certain gear on camp for our team","checked":false},
                              {"id":307,"question":"I can use camp tools safely on camp","checked":false},
                              {"id":308,"question":"I know how to clean and treat a small cut or scratch","checked":false},
                              {"id":309,"question":"I know and can discuss the main principles of “Leave No Trace","checked":false},
                              {"id":310,"question":"I can show a younger member of my team how to pitch a tent with the help of others","checked":false},
                              {"id":311,"question":"I can assist in the cooking of a meal while on camp","checked":false},
                              {"id":312,"question":"I can help others to learn about camping","checked":false},
                              {"id":313,"question":"I have spent at least two consecutive nights on camp","checked":false},
                            ],
                            [
                              {"id":401,"question":"4)I know what personal gear I should bring on a lightweight and standing camp","checked":false},
                              {"id":402,"question":"I can pack my rucksack properly for a lightweight camp.","checked":false},
                              {"id":403,"question":"I know how to use our team gear correctly and safely.","checked":false},
                              {"id":404,"question":"I know how to care for our team equipment during and in between camp.","checked":false},
                              {"id":405,"question":"I know the best place to pitch our tent and I can explain why.","checked":false},
                              {"id":406,"question":"I know how to use and store tools safely.","checked":false},
                              {"id":407,"question":"I know what to do in the case of cuts and minor burns.","checked":false},
                              {"id":408,"question":"I can be safe around fires and cooking equipment.","checked":false},
                              {"id":409,"question":"I can be a constructive member of my team while on camp.","checked":false},
                              {"id":410,"question":"I can assist in the pitching of a tent with my team.","checked":false},
                              {"id":411,"question":"I have spent at least four nights on camp","checked":false},
                            ],
                            [
                              {'id':501,'question':'5)I know what you need for building shelters and bivvys.','checked':false},
                              {'id':502,'question':'I can explain how you choose the best type of tent for a specific camp.','checked':false},
                              {'id':503,'question':'I know how to store and cook food safely on camp.','checked':false},
                              {'id':504,'question':'I know what team equipment to bring on various types of camps.','checked':false},
                              {'id':505,'question':'I can plan a balanced menu with my team for a camping adventure.','checked':false},
                              {'id':506,'question':'I can select suitable locations for a standing or lightweight camp.','checked':false},
                              {'id':507,'question':'I can show the best layout for a team campsite.','checked':false},
                              {'id':508,'question':'I can use at least two different types of cooking fires and stoves.','checked':false},
                              {'id':509,'question':'I can give a weather report to our Scouter for the duration of a camp.','checked':false},
                              {'id':510,'question':'I can show the best location on camp for a chopping pit.','checked':false},
                              {'id':511,'question':'I can show a younger Scout how to pitch a tent.','checked':false},
                              {'id':512,'question':'I know how to pitch and set tents correctly for bad weather conditions.','checked':false},
                              {'id':513,'question':'I understand the importance of proper waste management on camp.','checked':false},
                              {'id':514,'question':'I can light and maintain a cooking fire.','checked':false},
                              {'id':515,'question':'I know how to cook a good balanced meal on a fire.','checked':false},
                              {'id':516,'question':'I have spent at least five consecutive nights on camp.','checked':false},
                              {'id':517,'question':'I have spent at least one night, lightweight camping','checked':false},
                            ],
                            [
                              {'id':601,'question':'6)I know how to plan the menu and purchase the food for a weekend camp.','checked':false},
                              {'id':602,'question':'I can source local knowledge with regards to a campsite and surrounding area.','checked':false},
                              {'id':603,'question':'I know how to plan a programme of activities for a camp.','checked':false},
                              {'id':604,'question':'I know the causes and how to recognize and treat hypothermia, hyperthermia, sunstroke, dehydration and asthma, or any medical conditions relevant to my team.','checked':false},
                              {'id':605,'question':'I can show how to care for, store and maintain all our team equipment.','checked':false},
                              {'id':606,'question':'I can explain what group emergency equipment we should bring on camp and why.','checked':false},
                              {'id':607,'question':'I can organise the pitching and striking of a team campsite.','checked':false},
                              {'id':608,'question':'I know how to use a variety of stoves in outdoor conditions safely.','checked':false},
                              {'id':609,'question':'I can talk to our team about the hazards involved in camping.','checked':false},
                              {'id':610,'question':'I can pitch a tent that I am not familiar with.','checked':false},
                              {'id':611,'question':'I have successfully camped in a variety of weather conditions.','checked':false},
                              {'id':612,'question':'I have spent at least eight nights on camp including a week-long camp.','checked':false},
                              {'id':613,'question':'I have spent at least two consecutive nights lightweight camping.','checked':false},
                            ],
                            [
                              {'id':701,'question':'7)I know how to select a suitable location for both standing and lightweight camps.','checked':false},
                              {'id':702,'question':'I can plan and lead a team camp in a remote location for a minimum of two nights.','checked':false},
                              {'id':703,'question':'I know how to organise the transport required for our camp.','checked':false},
                              {'id':704,'question':'I know how to plan activities for various types of camps.','checked':false},
                              {'id':705,'question':'I know how to make contingency plans for our camp.','checked':false},
                              {'id':706,'question':'I can take responsibility for myself and my team while on camp.','checked':false},
                              {'id':707,'question':'I can help those camping with my team to learn new skills.','checked':false},
                              {'id':708,'question':'I have spent at least 12 nights on various types of camps, including at least two consecutive nights without a Scouter. ','checked':false},
                          ],
                          [
                              {'id':801,'question':'8)I can prepare for a specialist expedition and have acquired the necessary skills','checked':false},
                              {'id':802,'question':'I can source, compare and organise various transport options for getting to local and foreign locations','checked':false},
                              {'id':803,'question':'I know how to create an exciting expedition while catering for everyone’s needs.','checked':false},
                              {'id':804,'question':'I know how to be active in the out of doors, without disturbing the balance of nature.','checked':false},
                              {'id':805,'question':'I have assisted in the organisation of at least two camps either for my Team, or another Team in my own Group or in another Group.','checked':false},
                              {'id':806,'question':'I have spent at least 16 nights on various types of camps.','checked':false},
                          ],
                          [
                              {'id':901,'question':'9)I know how to budget, prepare and manage every aspect of the expedition.','checked':false},
                              {'id':902,'question':'I know how to ensure that safety precautions are put in place, without curtailing the fun of our camp.','checked':false},
                              {'id':903,'question':'I can plan and execute, camps and expeditions in all types of locations - at home or abroad.','checked':false},
                              {'id':904,'question':'I know how to source amenities and local places of interest.','checked':false},
                              {'id':905,'question':'I know how to use a variety of cooking stoves, and know when each type is most effective.','checked':false},
                              {'id':906,'question':'I have organized and led at least one camp for my team.','checked':false},
                              {'id':907,'question':'I have spent at least 20 nights on various types of camps.','checked':false},
                          ],
                          ]
                        };
      this.save(camping_data);
  }

  save = async questions => {
    try {
      await AsyncStorage.setItem('@' + Constants.CAMPING, JSON.stringify(questions))
      console.log(Constants.CAMPING + ' Data successfully saved!')
    } catch (e) {
      console.log('Failed to save.' + Constants.CAMPING)
    }
  }

  render(){

    return (  
      
      <View>
        <NativeRouter>
          <SkillSelect/>
        </NativeRouter>
      </View>
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

export default App;
  





