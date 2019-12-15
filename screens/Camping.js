import React, { Component }from 'react';
import { StyleSheet, TouchableOpacity, Text, View,Image,Button } from 'react-native';
import CheckBox from '../component/CheckBox'

import SkillButton from '../component/SkillButton'

export default class Camping extends Component{

    render = () => {     
        return (
          <View style={styles.container}>
              <CheckBox/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center', 
    flexDirection:'column',
  }
});