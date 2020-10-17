import React from "react";
import { StyleSheet, TouchableOpacity, Text, View,Platform,Image,Linking } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';
import * as Constant from '../component/Constants';
import { AntIconLink } from '../component/AntIconLink';

const AboutApp = () => {
  const iconSize = RFPercentage(6)
  
  return (
    <View style={styles.container}>

      <View style={styles.centerContainer}>
        <Image source={require('../assets/imgs/newry-scouts-logo.jpg')} resizeMode='contain' style={styles.imageStyle} />
      </View>

      <Text style={styles.descriptionStyle}>
        Scouting is a Movement of Young People, which helps to achieve their full potential through a programme based on fun, friendship, challenge and adventure.
        Young People in Scouting are supported, encouraged and led by adult volunteers, all of whom understand the responsibility and trust placed in them by parents and guardians.
        The encouragement of self-awareness in its members, as individuals and as members of Groups, is fundamental to Scouting. A natural result of this should be that an environment is created where all our members (regardless of age, gender, sexuality, race, ethnicity, religion, political persuasion or ability) feel comfortable to be themselves, to do their best, to achieve their full potential and, as responsible citizens, to improve society.      
      </Text>
      

      <View style={[styles.socialStyles,styles.centerContainer]}>
        <AntIconLink name='facebook-square' iconSize={iconSize} color="#4267B2" mobileURL={'fb://page/127280414090853'} websiteURL={'https://www.facebook.com/NewryScouts/'}/>
        <AntIconLink name='twitter' iconSize={iconSize} color="#1DA1F2" mobileURL={'twitter://user?screen_name=newryscouts?lang=en'} websiteURL={'https://twitter.com/newryscouts?lang=en'}/>
        <AntIconLink name='youtube' iconSize={iconSize} color="#FF0000" mobileURL={'http://www.youtube.com/c/NewryScouts'} websiteURL={'http://www.youtube.com/c/NewryScouts'}/>
        <AntIconLink name="instagram" iconSize={iconSize} color="black" mobileURL={'https://www.instagram.com/newryscouts/'} websiteURL={'https://www.instagram.com/newryscouts/'}/>
      </View>

      <View style={styles.centerContainer}>
        <TouchableOpacity style={[styles.buttonStyle, styles.centerContainer]} onPress={() => Linking.openURL('https://newryscouts.com/donate.html')}>
          <Text style={styles.buttonTextStyle}>Donate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonStyle, styles.centerContainer]} onPress={() => Linking.openURL('https://newryscouts.com/contact.html')}>
          <Text style={styles.buttonTextStyle}>Contact us</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.versionStyle}>
        <Text>{Constants.nativeAppVersion}</Text>
      </View>

    </View>
  );
}

export default AboutApp;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    flexGrow:1,
  },
  imageStyle:{ 
    width: RFPercentage(40),
    height: RFPercentage(25) 
  },
  centerContainer:{
    justifyContent:'space-around',
    alignItems:'center'
  },
  descriptionStyle:{
    paddingHorizontal:RFPercentage(2),
    fontSize:RFPercentage(1.6)
  },
  socialStyles: {
    flexDirection:'row', 
    marginVertical:RFPercentage(5)
  },
  buttonStyle:{
    borderWidth:1,
    borderColor:'black',
    borderRadius:2,
    margin:10,
    padding:10,
    width:RFPercentage(30),
    backgroundColor:Constant.PRIMARY_COLOUR
  },
  buttonTextStyle:{
    fontFamily: 'usuzi',
    color:'white',
    fontSize:RFPercentage(2)
  },
  versionStyle: {
    alignItems:'flex-end',
    justifyContent:'flex-end',
    flexGrow:1,
  }
});
