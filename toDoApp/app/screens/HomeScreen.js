import React, { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback,Keyboard, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import RoundButton from '../components/RoundButton';
import SearchBar from '../components/SearchBar';
import AddTask from '../components/AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../components/Task';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTasks } from '../context/TaskProvider';
import NoSearchResults from '../components/NoSearchResults';

const dataOrder = (data)=>{
    return data.sort((a,b)=>{
        const aInt = parseInt(a.time)
        const bInt = parseInt(b.time)
        if(aInt < bInt) return 1
        if(aInt === bInt) return 0
        if(aInt > bInt) return -1
    })
}
const HomeScreen = ({navigation}) => {
    
    const [modalVisible, setModalVisible] = useState(false)
    const [time, setTime] = useState()
    const[searchQuery, setSearchQuery] = useState('')
    const[noSearchResults, setNoSearchResults] = useState(false)
    const {tasks, setTasks, findTasks} = useTasks()
    const getTime = ()=>{
        const hours = new Date().getHours()
        if (hours === 0 || hours < 12) return setTime('Morning')
        if (hours === 1 || hours < 17) return setTime('Afternoon')
        setTime("Evening")
    }

    const submittedTask = async (title, description)=>{
        const time = new Date().getTime()
        const task = {id: time, title, description, time}
        const updateTasks = [...tasks, task ]
        setTasks(updateTasks)
        await AsyncStorage.setItem('tasks', JSON.stringify(updateTasks))
    }

    const openTask = (task)=>{
        navigation.navigate("TaskDetails", {task})

    }

    const queryResults = async (text)=>{
        setSearchQuery(text)
        if(!text.trim()){
            setSearchQuery('')
            setNoSearchResults(false)
            return await findTasks()
        }
        const filteredTasks = tasks.filter(task=>{
            if(task.title.toLowerCase().includes(text.toLowerCase())){
                return task
            }
        })
        if(filteredTasks.length){
            setTasks([...filteredTasks])
        }else{
            setNoSearchResults(true)
        }
    }

    useEffect(()=>{
        getTime()
    }, [])
    const orderedTasks = dataOrder(tasks)
    const clearSearchButton = async()=>{
        setSearchQuery('')
        setNoSearchResults(false)
        await findTasks()
    }
  return (
    <>
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content"/>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText} >{`Good ${time},`} </Text>
                    <Text style={styles.headerIcon} ><MaterialIcons name="task" size={24} color="black" /></Text>
                </View>
                
                {tasks.length?<SearchBar value={searchQuery} onChangeText={queryResults} onClear={clearSearchButton}/>:null}
                {noSearchResults? <NoSearchResults/>:
                <FlatList data={orderedTasks} 
                
                keyExtractor={item=>item.id.toString() } 
                renderItem={({item})=><Task item={item} onPress={()=>openTask(item)}/>}
                />}
                
                {!tasks.length ? (<View style = {styles.body}>
                    <Text style= {styles.text}>Add Task</Text>
                   
                </View>):null}
            
            </View>
        </TouchableWithoutFeedback>
        <RoundButton name='plus' onPress={()=>setModalVisible(true)} style={styles.addTask}/>
        
        <AddTask visible={modalVisible} onClose={()=>setModalVisible(false)} onSubmit={submittedTask}/>
    </>
    
  );
}
const width = Dimensions.get('window').width - 60
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 1,
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        paddingBottom: 20,
        borderRadius: 10,
        margin: 5,

    },
    header:{
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 25,
        backgroundColor: Colors.SECONDARY,
        padding: 8,
        width: Dimensions.get('window').width - 50,
        justifyContent: 'space-between',
        alignItems:'center',
        borderRadius: 10,
        opacity: 1,
        color: Colors.DARK,
    },

    headerIcon:{
        color: Colors.DARK,
        marginLeft: 5,
        opacity: .7,

    },
    headerText:{
        fontSize: 20,

    },

    body:{
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        alignItems: 'center',
        width,
        

    },
    text:{
        fontSize: 30,
        opacity: .2,

    },

    addTask:{
        position: 'absolute',
        bottom: 50,
        right: 15,
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
    },
})
export default HomeScreen;
