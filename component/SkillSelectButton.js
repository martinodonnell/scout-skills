import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from "expo-router";
export default class extends Component {


  render() {
    const { skill, textColor } = this.props
    return (
      <Link style={[styles.container, { backgroundColor: textColor }]} href={`/skills/${skill}`}>
        {this.props.skill}
      </Link>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    color: 'white',
    fontFamily: 'usuzi',
    fontSize: 20
  },
});












