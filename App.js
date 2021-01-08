import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import Room from './rooms/rooms';
import Login from './users/login';
import Test from './test/test';


export default () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator >
      
        <Stack.Screen name = "Login" component = {Login} />
        <Stack.Screen name = "Room" component = {Room} options={{headerShown: false }}/>
        <Stack.Screen name = "test" component = {Test} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

