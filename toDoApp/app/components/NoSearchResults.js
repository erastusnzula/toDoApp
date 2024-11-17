import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../constants/Colors';

const NoSearchResults = () => {
  return (
    <View style = {[StyleSheet.absoluteFillObject,styles.container]}>
      <AntDesign name='frown' size={100} color={Colors.SECONDARY}/>
      <Text style={styles.text}>No Results!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    text:{
        marginTop: 20,
        fontSize: 40,
        color: Colors.SECONDARY,
    },
})
export default NoSearchResults;
