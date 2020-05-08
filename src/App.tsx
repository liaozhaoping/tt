import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StackRoutes from './routes/stackRoutes';
import {StatusBar} from "react-native";

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content"/>
        <StackRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
