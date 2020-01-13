import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../screens/Home'
import SkillScreen from '../screens/SkillScreen'
import UserSelect from '../screens/UserSelect'

import { Actions } from 'react-native-router-flux';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" hideNavBar={true} component = {Home} title = "Home" />
         <Scene key = "skillScreen" hideNavBar={true} component = {SkillScreen} title = "SkillScreen"/>
         <Scene key = "userSelect" hideNavBar={true} component = {UserSelect} title = "UserSelect" initial = {true} />

      </Scene>
   </Router>
)
export default Routes