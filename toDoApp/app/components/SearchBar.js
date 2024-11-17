import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

const SearchBar = ({value, onChangeText, onClear}) => {
  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={onChangeText} style = {styles.textInput} placeholder='Search Task'/>
      {value? <AntDesign name='close' size={20} color={Colors.ERROR} onPress={onClear} style={styles.clear}/>: null}
    </View>
  );
}

const width = Dimensions.get('window').width - 50
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
    },
    textInput:{
        backgroundColor: Colors.LIGHT,
        width,
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
        color: Colors.PRIMARY,
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 20,
    },
    clear:{
      position: 'absolute',
      right: 15,
    },
})
export default SearchBar;
