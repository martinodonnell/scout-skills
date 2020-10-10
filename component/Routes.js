import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../screens/Home'
import { SkillScreen } from '../screens/SkillScreen'

const Routes = () => (
   <Router>
      <Scene key="root">
         <Scene key="home" component={Home} title="Adventure Skills" initial={true} />
         <Scene key="skillScreen" component={SkillScreen} title="" />
      </Scene>
   </Router>
)
export default Routes