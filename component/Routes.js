import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../screens/Home'
import SkillScreen from './SkillScreen'
import { Actions } from 'react-native-router-flux';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" hideNavBar={true} component = {Home} title = "Home" initial = {true} />
         <Scene key = "skillScreen" component = {SkillScreen} title = "SkillScreen"/>

      </Scene>
   </Router>
)
export default Routes