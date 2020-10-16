import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View,Platform,Image,Linking } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { RFPercentage } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';
import * as Constant from '../component/Constants';
import * as MailComposer from 'expo-mail-composer';

const AntIconLink = ({name,iconSize,color, url}) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <AntDesign name={name} size={iconSize} color={color} />
  </TouchableOpacity>
)

const FoundationIconLink = ({name,iconSize,color, url}) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Foundation name={name} size={iconSize} color={color} />
  </TouchableOpacity>
)

const AboutApp = () => {
  const iconSize = RFPercentage(6)
  const options = {
    recipients: ['website@newryscouts.com'],
  }
  
  return (
    <View style={styles.container}>

      <View style={styles.centerContainer}>
        <Image source={require('../assets/imgs/newry-scouts-logo.jpg')} resizeMode='contain' style={styles.imageStyle} />
      </View>

      <Text style={{paddingHorizontal:RFPercentage(2)}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>

      <View style={[styles.socialStyles,styles.centerContainer]}>
        <AntIconLink name='facebook-square' iconSize={iconSize} color="#4267B2" url={'https://www.facebook.com/NewryScouts'}/>
        <AntIconLink name='twitter' iconSize={iconSize} color="#1DA1F2" url={'https://twitter.com/newryscouts?lang=en'}/>
        <AntIconLink name='youtube' iconSize={iconSize} color="#FF0000" url={'https://www.youtube.com/channel/UC0KFsxYhBADWQ0D5I8jeCLw'}/>
        <FoundationIconLink name="web" iconSize={iconSize} color="grey" url={'https://newryscouts.com/'}/>
      </View>

      <View style={styles.centerContainer}>
        <TouchableOpacity style={[styles.buttonStyle, styles.centerContainer]} onPress={() => Linking.openURL('https://newryscouts.com/donate.html')}>
          <Text style={styles.buttonTextStyle}>Donate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonStyle, styles.centerContainer]} onPress={() => MailComposer.composeAsync(options)}>
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
