import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StatusBar, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions, } from 'react-native';
import Colors from '../constants/Colors';
import RoundButton from './RoundButton';
import AntDesign from '@expo/vector-icons/AntDesign';



const AddTask = ({visible, onClose, onSubmit, isEdit, newTask, task}) => {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(()=>{
        if(isEdit){
            setTitle(task.title)
            setDescription(task.description)
        }
    },[isEdit])
    const closeModal = ()=>{
        Keyboard.dismiss()
    }
    const getTextInput = (text, valueFor)=>{
        if(valueFor === 'title')setTitle(text)
        if(valueFor === 'description')setDescription(text)
        
    }
    const submitTask = ()=>{
        if(!title.trim() && !description.trim()) return onClose()
        if(isEdit){
            onSubmit(title, description, Date.now())
        }else{
            onSubmit(title, description)
            setTitle('')
            setDescription('')
        }
        
        onClose()
    }

    const cancelTask = ()=>{
        if(!isEdit){
            setTitle('')
            setDescription('')
        }
        onClose()
    }

  return (
    <>
        <StatusBar backgroundColor={Colors.PRIMARY}/>
        <Modal visible = {visible} animationType='slide' style={{}}>
            <AntDesign name="arrowleft" size={24} color={Colors.PRIMARY} style={styles.back} onPress={cancelTask}/>
            <Text style={{textAlign:'center', fontSize: 25, fontWeight: 'bold', color: Colors.PRIMARY}}>{newTask||'Add new Task'}</Text>
            <View style = {styles.container}>
                <TextInput style = {[styles.textInput, styles.title]} placeholder='Title' value={title} onChangeText={(text)=>getTextInput(text, 'title')}/>
                <TextInput style = {[styles.textInput, styles.description]} placeholder='Description' value={description} multiline onChangeText={(text)=>getTextInput(text, 'description')}/>
                <View style={styles.submitContainer}>
                    <RoundButton name='check' size={30} style={styles.submit} onPress={submitTask}/>
                    <RoundButton name='close' size={30} style={styles.submit} onPress={()=>cancelTask()}/>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={[styles.modalButton, StyleSheet.absoluteFillObject]}>
                </View>
            </TouchableWithoutFeedback>     
        </Modal>
    </>
    
  );
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 60,
        width: Dimensions.get('window').width,
        paddingTop: 20,
        paddingHorizontal: 20,
       
    },
    textInput:{
        borderBottomWidth: 2,
        borderBottomColor: Colors.PRIMARY,
        fontSize: 20,
        textAlignVertical: 'top',
        backgroundColor: Colors.SECONDARY,
        borderRadius: 8,
        paddingHorizontal: 15,

    },
    title:{
        height: 50,
        marginBottom: 10,
        fontWeight: 'bold',
        color: Colors.DARK,
    },
    description:{
        height: 150, 
    },
    modalButton:{
        flex: 1,
        zIndex: -1,
    },

    submitContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 15,
    },

    submit:{
        padding: 10,
        backgroundColor: Colors.PRIMARY,
        color: Colors.LIGHT,
    },
    back:{
        marginHorizontal: 20,
        marginTop: 10,
        padding: 5,
    }
})

export default AddTask;
