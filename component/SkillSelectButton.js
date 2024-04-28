import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";

export default class extends Component {
  render() {
    const { skill, textColor } = this.props;

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
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 5,
    overflow: 'hidden',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: RFPercentage(3.5),
    fontFamily: 'usuzi',
  },
});












