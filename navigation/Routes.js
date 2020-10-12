import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Router, Scene,Actions } from 'react-native-router-flux'
import Home from '../screens/Home'
import { SettingsScreen } from '../screens/SettingsScreen';
import { SkillScreen } from '../screens/SkillScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const SettingsButton = () => (
   <TouchableOpacity style={{ marginRight: 30 }} onPress={() => Actions.settings()}>
      <FontAwesomeIcon
         icon={faCog}
         size={25}
         color='white'
      />
   </TouchableOpacity>
)

const Routes = () => (
   <Router>
      <Scene key="root" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} tintColor='#fff'>
         <Scene
            key="home"
            component={Home}
            title="Adventure Skills"
            initial={true}
            renderRightButton={SettingsButton}
         />
         <Scene
            key="skillScreen"
            component={SkillScreen}
            title=""
            backTitle = " "
         />
         <Scene
            key="settings"
            component={SettingsScreen}
            title="Settings"
         />
      </Scene>
   </Router>
)

const styles = StyleSheet.create({
   navBar: {
      backgroundColor: '#46BDFF',
      borderBottomStartRadius: 15,
      borderBottomEndRadius: 15
      // borderBottomColor:'#46BDFF',
      // elevation: 0,
      // shadowOpacity: 0,
      // borderBottomWidth: 0,
   },
   navTitle: {
      color: 'white',
      fontFamily: 'usuzi',
   }
})

export default Routes