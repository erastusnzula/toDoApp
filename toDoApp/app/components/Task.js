import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasks } from '../context/TaskProvider';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Task = ({item,onPress}) => {
    const {title, description} = item
    const [task, setTask] = useState(item)
    const{setTasks} = useTasks()
    const [complete, setComplete] = useState(false)

    const deleteAlertHome = ()=>{
      Alert.alert(`Delete ${item.title}`, `Are you sure you want to delete: ${item.title}?`,[
        {
          text: "Yes",
          onPress: ()=>deleteTaskHome()
        },{
          'text': 'No',
          onPress: ()=>{return}
        }
      ],{
        cancelable: true
      })
    }

    const deleteTaskHome = async ()=>{
      const getTasks = await AsyncStorage.getItem('tasks')
      let tasks = []
      if(getTasks !== null) tasks = JSON.parse(getTasks)
      const newTasks = tasks.filter(n => n.id !==task.id)
      setTasks(newTasks)
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    const completeTask= async () =>{
      const getTasks = await AsyncStorage.getItem('tasks')
      let tasks = []
      if(getTasks !== null) tasks = JSON.parse(getTasks)
        const newTasks = tasks.filter(n=>{
          if(n.id === task.id){
            setComplete(true)
            setTask(n)
          }
          return n
      
        })
        setTasks(newTasks)
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    const completeAlert = ()=>{
      Alert.alert(`Mark Task Complete`, `Are you sure you want to mark the task: ${task.title} complete ?`,[
        {
          text: "Yes",
          onPress: ()=>completeTask()
        },{
          'text': 'No',
          onPress: ()=>{return}
        }
      ],{
        cancelable: true
      })
    }
  return (
    <TouchableOpacity onPress={onPress} style = {styles.container}>
      <TouchableOpacity onPress={completeAlert} style={styles.deleteContainer}>
      {complete? <MaterialIcons name="task" size={15} color={Colors.PRIMARY} /> :<Feather name="square" size={15} color={Colors.PRIMARY} style={styles.checkbox} />}
      </TouchableOpacity>
      <View>
        <Text style={complete?styles.titleComplete:styles.title} numberOfLines={2}>{title}</Text>
        <Text style={complete?styles.descriptionComplete: styles.description} numberOfLines={3}>{description}</Text>
      </View>
      <TouchableOpacity onPress={deleteAlertHome} style={styles.deleteContainer}>
        <AntDesign name="delete" size={15} color="red" />
      </TouchableOpacity>
      
    </TouchableOpacity>
  );
}
const width = Dimensions.get('window').width - 60
const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.SECONDARY,
        width: width,
        margin: 2,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    title:{
        marginBottom: 2,
        paddingBottom: 2,
        fontSize: 16,
        fontWeight:'bold',
    },
    titleComplete:{
      marginBottom: 2,
      paddingBottom: 2,
      fontSize: 16,
      fontWeight:'bold',
      textDecorationLine: 'line-through', 
    },
    description:{
      width: .8*width,
      fontSize: 16
    },

    descriptionComplete:{
      width: .8*width,
      fontSize: 16,
      textDecorationLine: 'line-through', 
    },
    deleteContainer:{
      marginRight: 10,
      padding: 2,
      paddingTop: 5,
      paddingBottom: 5,
    }
})
export default Task;
