import React, { Component, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Platform, Button } from "react-native";
import * as Constants from "../component/Constants";
import SkillSelectButton from "../component/SkillSelectButton";
import { Stack, Link } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Adventure Skills',
          headerRight: () => <Link href='/settings'>
            <FontAwesomeIcon
              icon={faCog}
              size={25}
              color='white'
            />
          </Link>
        }}
      />
      <SkillSelectButton skill={Constants.CAMPING} textColor="#009F54" />
      <SkillSelectButton skill={Constants.BACKWOODS} textColor="#559632" />
      <SkillSelectButton skill={Constants.PIONEERING} textColor="#004E50" />

      <SkillSelectButton skill={Constants.EMERGENCIES} textColor="#F57A41" />
      <SkillSelectButton skill={Constants.HIKING} textColor="#F57921" />
      <SkillSelectButton skill={Constants.AIR} textColor="#007CC2" />

      <SkillSelectButton skill={Constants.PADDLING} textColor="#0668B3" />
      <SkillSelectButton skill={Constants.ROWING} textColor="#0668B3" />
      <SkillSelectButton skill={Constants.SAILING} textColor="#0060AA" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    paddingBottom: Platform.OS === 'ios' ? 20 : 10
  },
});
