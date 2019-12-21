import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

  render(){
    return (  
      <View>        
        <SkillScreen level={1}/> 
        {/* {Stage1} */}
      </View>

    // <NativeRouter>
    //   <View style={styles.container}>
    //     <View style={styles.nav}>
    //       <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
    //         <Text>Home</Text>
    //       </Link>
    //       <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
    //         <Text>About</Text>
    //       </Link>
    //       <Link to="/topics" underlayColor="#f0f4f7" style={styles.navItem}>
    //         <Text>Topics</Text>
    //       </Link>
    //     </View>

    //     <Route exact path="/" component={Home} />
    //     <Route path="/about" component={Stage1} />
    //     <Route path="/topics" component={Stage2} />
    //   </View>
    // </NativeRouter>
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

  





