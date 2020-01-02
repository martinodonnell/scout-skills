import React, {Component} from 'react';
import { NativeRouter, Route, Link,Redirect } from "react-router-native";
import { StyleSheet, Text, View,Button} from 'react-native';

import SkillScreen from './SkillScreen';
import AdventureSkills from './AdventureSkills';

const Home   = () => <AdventureSkills/>
const Stage1 = () => <SkillScreen level={1}/>;
const Stage2 = () => <SkillScreen level={2}/>;
const Stage3 = () => <SkillScreen level={3}/>;
const Stage4 = () => <SkillScreen level={4}/>;
const Stage5 = () => <SkillScreen level={5}/>;
const Stage6 = () => <SkillScreen level={6}/>;
const Stage7 = () => <SkillScreen level={7}/>;
const Stage8 = () => <SkillScreen level={8}/>;
const Stage9 = () => <SkillScreen level={9}/>;

class SkillSelect extends Component { 

  constructor(props){
    super(props);
    this.state = {
      currentLevel:1,
    }
  }

  lowerLevel(){
    // const history = useHistory();
    const {currentLevel} = this.state;
    if(currentLevel>1){
      this.setState({currentLevel:currentLevel-1});
    }
  }

   higherLevel(){
    // const history = useHistory();
    const {currentLevel} = this.state;
    if(currentLevel<9){
      this.setState({currentLevel:currentLevel+1});
    }
  }

  render(){

    const {currentLevel} = this.state;
    const linkLower = (currentLevel==1)? currentLevel:currentLevel-1;
    const linkHigher = (currentLevel==9)? currentLevel:currentLevel+1;

    return (          
        <View style={styles.container}>
            <View style={styles.nav}>
              <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Home</Text>
              </Link>
              <Link to={"/stage" + (linkLower)} onPress={()=>this.lowerLevel()} underlayColor="#f0f4f7" style={styles.navItem} pointerEvents="none">
                <Text>Lower</Text>
              </Link>
              <Link to={"/stage" + (linkHigher)} onPress={()=>this.higherLevel()} underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Higher</Text>
              </Link>
            </View>
            <View>
              <Route exact path="/" component={Home} />
              <Route path="/stage1" component={Stage1} />
              <Route path="/stage2" component={Stage2} />
              <Route path="/stage3" component={Stage3} />
              <Route path="/stage4" component={Stage4} />
              <Route path="/stage5" component={Stage5} />
              <Route path="/stage6" component={Stage6} />
              <Route path="/stage7" component={Stage7} />
              <Route path="/stage8" component={Stage8} />
              <Route path="/stage9" component={Stage9} />
            </View>
          </View>    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    borderColor:'red',
    borderRadius: 4,
    borderWidth: 0.5,
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
  }
});

export default SkillSelect;



  





