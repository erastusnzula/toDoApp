import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import Colors from '../constants/Colors';


const RoundButton = ({name, size, color, style, onPress}) => {
  return <AntDesign name={name} size={size} color={color} onPress={onPress} style={[styles.container, {...style}]}/>
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.LIGHT,
    padding: 5,
    borderRadius: 50,
    color: Colors.PRIMARY,

  }
})
export default RoundButton;
