import React, {Component} from 'react'
import { StyleSheet, TouchableOpacity,Image,Text } from 'react-native';


class SkillButton extends Component {

    render(){
        return(
              <TouchableOpacity style={styles.button} onPress={this.props.nav}>
                <Image 
                  style={styles.skill_img} 
                  source={this.props.img}
              /> 
            </TouchableOpacity>
        
        );
    }
}

export default SkillButton

const styles = StyleSheet.create({
  button:{
    flex:1,
    alignItems: 'center',
  },
  skill_img:{
    width: 125,
    height: 125,
    resizeMode: 'contain'
  }
});