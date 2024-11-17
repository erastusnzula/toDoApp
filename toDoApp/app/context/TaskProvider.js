import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext()

const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([])
    const findTasks = async()=>{
        const tasks = await AsyncStorage.getItem('tasks')
        if(tasks !== null) setTasks(JSON.parse(tasks))
     }
     useEffect(()=>{
        findTasks()
    }, [])
  return (
    <TaskContext.Provider value = {{tasks, setTasks, findTasks}}>
        {children}
    </TaskContext.Provider>
  );
}

export const useTasks = ()=>useContext(TaskContext)
export default TaskProvider;
