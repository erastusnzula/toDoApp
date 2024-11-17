import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from './app/components/TaskDetails';
import Colors from './app/constants/Colors';
import TaskProvider from './app/context/TaskProvider';


const Stack = createNativeStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator initialRouteName='Home'
    screenOptions={{
      headerStyle: { backgroundColor: Colors.PRIMARY },
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: 'TO-DO TASKS', 
        headerShown: true, 
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
          }, 
          headerTintColor: Colors.LIGHT,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          
        }} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} options={{ title: '', headerShown: true }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
  <NavigationContainer>
    <TaskProvider>
      <RootStack />
    </TaskProvider>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
