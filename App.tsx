import { StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import IndividualChatScreen from "./src/screens/IndividualChatScreen";
import {RootStackParamList} from "./routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="IndividualChat" component={IndividualChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
