import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../screens/Home'
import SkillScreen from '../screens/SkillScreen'
import UserSelect from '../screens/UserSelect'
import Login from '../component/login/Login'

const Routes = () => (
   <Router>
      <Scene key="root">
         <Scene key="home" hideNavBar={true} component={Home} title="Home" initial={true} />
         <Scene key="skillScreen" hideNavBar={true} component={SkillScreen} title="SkillScreen" />
      </Scene>
   </Router>
)
export default Routes