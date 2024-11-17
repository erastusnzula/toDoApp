import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Alert} from 'react-native';
import Colors from '../constants/Colors';
import RoundButton from './RoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasks } from '../context/TaskProvider';
import AddTask from './AddTask';

const formattedDate = (milliSeconds)=>{
    const options = {hour12:true}
    const date = new Date(milliSeconds)
    return date.toLocaleString('en-GB', options)
}


const TaskDetails = (props) => {
  const [task, setTask] = useState(props.route.params.task)
  const [isEdit, setIsEdit] = useState(false)
  const {setTasks} = useTasks()
  const [showModel, setShowModel] = useState(false)
  const deleteTask = async ()=>{
    const getTasks = await AsyncStorage.getItem('tasks')
    let tasks = []
    if(getTasks !== null) tasks = JSON.parse(getTasks)
    const newTasks = tasks.filter(n => n.id !==task.id)
    setTasks(newTasks)
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
    props.navigation.goBack()
    
    
  }
  

  const deleteAlert = ()=>{
    Alert.alert(`Delete ${task.title}`, `Are you sure you want to delete the task: ${task.title}?`,[
      {
        'text': 'Yes',
        onPress: ()=>{deleteTask()}
      },
      {
        'text': 'No',
        onPress: ()=>{return}
      }
    ], {
      cancelable:true
    })
    }
    
  const editAlert = ()=> {
    setIsEdit(true)
    setShowModel(true)
  }
  
  const closeUpdate = ()=>setShowModel(false)
  
  const updateTask = async (title, description, time) =>{
    const getTasks = await AsyncStorage.getItem('tasks')
    let tasks = []
    if(getTasks !== null) tasks = JSON.parse(getTasks)
    const newTasks = tasks.filter(n=>{
      if(n.id === task.id){
        n.title = title
        n.description = description
        n.isUpdated = true
        n.time = time
        setTask(n)
      }
      return n
  
    })
    setTasks(newTasks)
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))

  }
    
    
  return (
    <>
      
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.time}>{task.isUpdated ? `Updated on ${formattedDate(task.time)}`:`Created on ${formattedDate(task.time)}`}</Text>
      <ScrollView contentContainerStyle = {styles.container}>
       
      <Text style={styles.description}>{task.description}</Text>
      
      </ScrollView>
      <View style={styles.buttonsContainer}>
          <RoundButton style={styles.editButtons} name='edit' onPress={editAlert}/>
          <RoundButton name='delete' style={styles.deleteButtons} onPress={deleteAlert}/>
      </View>
      <AddTask isEdit = {isEdit} task = {task} visible={showModel} onClose={closeUpdate} newTask="Update Task" onSubmit={updateTask}/>
    </>
    
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
   
  },
  title:{
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 30,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    opacity: .7,
    textAlign: 'center',
  },
  description:{
    fontSize: 20,
    opacity: .9,
    backgroundColor:Colors.SECONDARY,
    padding: 10,
    borderRadius: 5,


  },
  time:{
    textAlign: 'center',
    fontSize: 12,
    opacity: .7,
    paddingHorizontal: 20,
    
  },
  buttonsContainer:{
    flexDirection: 'column',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: Dimensions.get('window').height * .5,
    right: 8,
  },
  editButtons:{
    padding: 15,
    fontSize: 20,
    marginBottom: 10,
    
  },
  deleteButtons:{
    padding: 15,
    color: Colors.ERROR,
    fontSize: 20,
  }
})

export default TaskDetails;
