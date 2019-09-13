import React, { Component }from 'react';
import { StyleSheet, Text, View,Image,Button } from 'react-native';


class Camping extends Component{

    render = () => {    
        return (
            <View style={styles.container}>
      <Text>Boo</Text>
    </View>
        );
    }
}



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-around',
  }
});

export default Camping;
