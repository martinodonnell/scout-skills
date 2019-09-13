import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function App() {
  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Adventure Skills</Text>
      </View>
      <View style={styles.container}>
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/camping-base.png')}
            resizeMode="contain"
        />
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/hiking-base.png')}
            resizeMode="contain"
        />
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/backwoods-base.png')}
            resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/sailing-base.png')}
            resizeMode="contain"
        />
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/rowing-base.png')}
            resizeMode="contain"
        />
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/paddling-base.png')}
            resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/pioneering-base.png')}
            resizeMode="contain"
        />
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/emergencies-base.png')}
            resizeMode="contain"
        />
        <Image 
            style={styles.skill_img} 
            source={require('./assets/badges/air-base.png')}
            resizeMode="contain"
        />
      </View>
    </React.Fragment>
    
    
  );
}

const styles = StyleSheet.create({
  titleContainer:{
    flex:0.5,
    alignItems: 'center',
    justifyContent: 'center',  
  
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  skill_img:{
    flex:1
  }
});
